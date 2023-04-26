'use strict';

module.exports = function(Author) {
  Author.validatesLengthOf('name', {
    min: 2,
    max: 128,
    message: {
      min: 'Author name should be at least 2 characters.',
      max: 'Author name should be at most 128 characters.',
    },
  });

  Author.validatesLengthOf('biography', {
    min: 16,
    max: 256,
    message: {
      min: 'Author biography should be at least 16 characters.',
      max: 'Author biography should be at most 256 characters.',
    },
    allowBlank: true,
    allowNull: true,
  });
};
