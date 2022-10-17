const { Post } = require('../models');

const PostData = [
    {
        title: 'Tailwinds css framework',
        content: 'How does eveyone feel about this framework? Ive had some hicups with it but overall i love its ease of use and sleak design.',
        user_id: 1,
    },
    {
        title: 'Any new JS frameworks anyones loving at the moment?',
        content: 'Im looking to start using something other than react, any suggestions?',
        user_id: 2,
    },
];

const seedPosts = () => Post.bulkCreate(PostData);

module.exports = seedPosts;