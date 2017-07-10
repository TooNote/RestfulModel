# RestfulModel

Models for restful API

## Usage

```javascript
var Model = require('tn-restful-model');
var Note = new Model({
    model: 'note',
    baseUrl: 'https://xiaotu.io/api/v1/',
    headers: {
        'X-Token': '1234567890abcde'
    }
});

// create
var response = await Note.create({
    title: 'test',
    content: 'test'
});

// read list
var noteList = await Note.read();

// read one with id
var note = await Note.read(1);

// update
var response = await Note.update({
    title: 'test again'
});

// delete
var response = await Note.delete(1);

```
