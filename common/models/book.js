'use strict';

module.exports = function(Book) {
  function bookYearValidator(err) {
    const {year} = this;
    if (typeof year !== 'number' ||
      year < 1 ||
      year > new Date().getFullYear())
      err();
  }

  Book.validate('year', bookYearValidator, {
    allowNull: false,
    message: 'Invalid year entered. Year should be a positive integer and should not be in the future',
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
};
