const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
      },
    ],
  })
    .then((products) => res.status(200).json(products))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get one product
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [
      {
        model: Category,
        attributes: ['id', 'category_name'],
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name'],
        through: ProductTag,
      },
    ],
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr).then((productTags) => {
          res.status(200).json({ product, productTags });
        });
      } else {
        res.status(200).json(product);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      return ProductTag.findAll({
        where: { product_id: req.params.id },
      });
    })
    .then((productTags) => {
      const productTagIds = productTags.map(({ tag_id }) => tag_id);

      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return ProductTag.destroy({ where: { id: productTagsToRemove } }).then(
        () => {
          return ProductTag.bulkCreate(newProductTags);
        },
      );
    })
    .then(() => {
      res.status(200).json({ message: 'Product updated successfully' });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;