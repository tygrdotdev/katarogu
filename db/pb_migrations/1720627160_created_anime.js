/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "o2guwvfzrwhrhgi",
    "created": "2024-07-10 15:59:20.230Z",
    "updated": "2024-07-10 15:59:20.230Z",
    "name": "anime",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wi7hrgxu",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("o2guwvfzrwhrhgi");

  return dao.deleteCollection(collection);
})
