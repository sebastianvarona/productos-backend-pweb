const Producto = require('../models/Producto');

function listall(req, res) {
    Producto.find({})
        .then(products => {
            if (products.length) return res.status(200).send({ products })
            return res.status(204).send({ message: 'NO CONTENT' });
        }).catch(err => res.status(500).send({ err }))
}

function create(req, res) {
    let product = new Producto(req.body);
    product.save()
        .then(product =>
            res.status(201).send({ product })
        ).catch(err => res.status(500).send({ err }))

}

function show(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.products) return res.status(404).send({ message: 'Not Found' });
    let products = req.body.products;
    return res.status(200).send({ products });
}

function update(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.products) return res.status(404).send({ message: 'Not Found' });
    let product = req.body.products[0];
    product = Object.assign(product, req.body);
    product.save()
        .then(product => res.status(200).send({ message: 'Producto Updated', product })
        ).catch(err => res.status(500).send({ err }))
}

function deleted(req, res) {
    if (req.body.error) return res.status(500).send({ error });
    if (!req.body.products) return res.status(404).send({ message: 'Not Found' });
    req.body.products[0].remove()
        .then(product => {
            res.status(200).send({ message: 'Producto removed', product })
        }
        ).catch(err => res.status(500).send({ err }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Producto.find(query).then(products => {
        if (!products.length) return next();
        req.body.products = products;
        return next();
    }).catch(err => {
        req.body.error = err;
        next();
    })
}

module.exports = {
    listall,
    show,
    create,
    update,
    deleted,
    find,
}