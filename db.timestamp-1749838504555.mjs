var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));

// astro:db:astro:db
var astro_db_exports = {};
__reExport(astro_db_exports, virtual_star);
import * as virtual_star from "@astrojs/db/dist/runtime/virtual.js";

// db/config.ts
var GuestBook = (0, astro_db_exports.defineTable)({
  columns: {
    id: astro_db_exports.column.number({ primaryKey: true }),
    author: astro_db_exports.column.text(),
    content: astro_db_exports.column.text(),
    timestamp: astro_db_exports.column.date({ default: astro_db_exports.NOW })
  }
});
var config_default = (0, astro_db_exports.defineDb)({
  tables: { GuestBook }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXN0cm86ZGIiLCAiZGIvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJleHBvcnQgKiBmcm9tIFwiQGFzdHJvanMvZGIvZGlzdC9ydW50aW1lL3ZpcnR1YWwuanNcIiIsICJpbXBvcnQgeyBkZWZpbmVEYiwgZGVmaW5lVGFibGUsIGNvbHVtbiwgTk9XIH0gZnJvbSAnYXN0cm86ZGInO1xuXG5jb25zdCBHdWVzdEJvb2sgPSBkZWZpbmVUYWJsZSh7XG4gIGNvbHVtbnM6IHtcbiAgICBpZDogY29sdW1uLm51bWJlcih7IHByaW1hcnlLZXk6IHRydWUgfSksXG4gICAgYXV0aG9yOiBjb2x1bW4udGV4dCgpLFxuICAgIGNvbnRlbnQ6IGNvbHVtbi50ZXh0KCksXG4gICAgdGltZXN0YW1wOiBjb2x1bW4uZGF0ZSh7IGRlZmF1bHQ6IE5PVyB9KSxcbiAgfSxcbn0pO1xuXG4vLyBodHRwczovL2FzdHJvLmJ1aWxkL2RiL2NvbmZpZ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lRGIoe1xuICB0YWJsZXM6IHsgR3Vlc3RCb29rfSxcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQSw4QkFBYzs7O0FDRWQsSUFBTSxnQkFBWSw4QkFBWTtBQUFBLEVBQzVCLFNBQVM7QUFBQSxJQUNQLElBQUksd0JBQU8sT0FBTyxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsSUFDdEMsUUFBUSx3QkFBTyxLQUFLO0FBQUEsSUFDcEIsU0FBUyx3QkFBTyxLQUFLO0FBQUEsSUFDckIsV0FBVyx3QkFBTyxLQUFLLEVBQUUsU0FBUyxxQkFBSSxDQUFDO0FBQUEsRUFDekM7QUFDRixDQUFDO0FBR0QsSUFBTyxxQkFBUSwyQkFBUztBQUFBLEVBQ3RCLFFBQVEsRUFBRSxVQUFTO0FBQ3JCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
