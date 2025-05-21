const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Autenticação (Login)
router.post('/login', async (req, res) => {
    try {
        const data = await User.findOne({ 'nome': req.body.nome });

        if (data != null && data.senha === req.body.senha) {
            const token = jwt.sign({ id: data._id }, 'segredo', { expiresIn: 300 });
            return res.json({ token: token });
        }

        res.status(401).json({ message: 'Login inválido!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Criar usuário
router.post('/users', async (req, res) => {
    try {
        const novoUsuario = new User(req.body);
        const resultado = await novoUsuario.save();
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Listar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Consultar usuário por ID
router.get('/users/:id', async (req, res) => {
    try {
        const usuario = await User.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Atualizar usuário
router.put('/users/:id', async (req, res) => {
    try {
        const usuarioAtualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuarioAtualizado) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remover usuário
router.delete('/users/:id', async (req, res) => {
    try {
        const usuarioRemovido = await User.findByIdAndDelete(req.params.id);
        if (!usuarioRemovido) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
