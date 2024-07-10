/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "t89pzpzu5ygzhnt",
    "created": "2024-07-10 15:59:20.230Z",
    "updated": "2024-07-10 15:59:20.230Z",
    "name": "manga_characters",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "uhmklyhi",
        "name": "manga",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ooz49c7u2ilzubk",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "y4t98hyu",
        "name": "character",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "i1qmhkse4yzcik8",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "m1fkc8me",
        "name": "role",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "main",
            "supporting"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("t89pzpzu5ygzhnt");

  return dao.deleteCollection(collection);
})
