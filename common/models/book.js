'use strict';

module.exports = function (Book) {
  function bookYearValidator(err) {
    const { year } = this;
    if (typeof year !== 'number' || year < 1 || year > new Date().getFullYear())
      err();
  }

  Book.validate('year', bookYearValidator, {
    allowNull: false,
    message:
      'Invalid year entered. Year should be a positive integer and should not be in the future',
  });

  Book.validatesLengthOf('title', {
    min: 2,
    max: 128,
    message: {
      min: 'Book title should be at least 2 characters.',
      max: 'Book title should be at most 128 characters.',
    },
  });

  Book.validatesLengthOf('publisher', {
    min: 2,
    max: 128,
    message: {
      min: 'Book publisher should be at least 2 characters.',
      max: 'Book publisher should be at most 128 characters.',
    },
  });

  // assume authorId is valid

  Book.recent = function (cb) {
    Book.find(
      {
        limit: 3,
        fields: ['title', 'authorId'],
        include: {
          relation: 'author',
        },
      },
      function (err, rawData) {
        if (err) return cb(err);

        const isValidData = rawData.length > 0;
        if (!isValidData) {
          return cb(null, {
            success: true,
            responses: ['No books available.'],
          });
        }

        const data = rawData
          .map((book) => {
            const { author, title } = book;
            return `  \u2022 ${title} by ${'authorName'}`;
          })
          .join('\n');

        cb(null, {
          success: isValidData,
          responses: [`Here are our newest books:\n${data}`],
        });
      }
    );
  };

  Book.remoteMethod('recent', {
    accepts: [],
    returns: [
      {
        root: true,
        arg: 'success',
        type: 'boolean',
      },
      {
        root: true,
        arg: 'responses',
        type: 'array',
      },
    ],
    http: {
      verb: 'get',
      path: '/recent',
      status: 200,
      errorStatus: 404,
    },
  });
};
