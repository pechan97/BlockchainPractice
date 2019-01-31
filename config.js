module.exports = {
    db: process.env.MONGODB || 'mongodb://localhost:27017/blockChain',
    port: process.env.PORT || 3000
}