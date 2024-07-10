/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "lwvwtohqwogx1i0",
    "created": "2024-07-10 15:59:20.230Z",
    "updated": "2024-07-10 15:59:20.230Z",
    "name": "manga_progress",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "p4jn2fyq",
        "name": "user",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "ernoipcr",
        "name": "entry",
        "type": "relation",
        "required": false,
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
        "id": "xghpkhnx",
        "name": "status",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "reading",
            "completed",
            "hold",
            "dropped",
            "planned"
          ]
        }
      },
      {
        "system": false,
        "id": "cbgast4i",
        "name": "current_volume",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "otrp3m9k",
        "name": "current_chapter",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      },
      {
        "system": false,
        "id": "bbzfe4d9",
        "name": "rating",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": 1,
          "max": 10,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_nnxyO7B` ON `manga_progress` (`user`)"
    ],
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
  const collection = dao.findCollectionByNameOrId("lwvwtohqwogx1i0");

  return dao.deleteCollection(collection);
})
