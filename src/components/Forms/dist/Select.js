"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Select = function (prop) {
    var _a;
    return (react_1["default"].createElement("div", { className: "w-full " + prop.className + " space-y-3" },
        prop.label ? (react_1["default"].createElement("label", { htmlFor: "", className: "w-full text-sm font-bold text-gray-light" }, prop.label)) : (""),
        react_1["default"].createElement("select", { value: prop.value, className: "w-full px-0 py-2 text-sm border-t-0 border-b border-l-0 border-r-0 cursor-pointer text-gray-light border-gray-soft-strong", onChange: prop.handleChange }, ((_a = prop.datas) === null || _a === void 0 ? void 0 : _a.length) &&
            prop.datas.map(function (val, index) { return (react_1["default"].createElement("option", { key: index, value: val.id }, val.name)); }))));
};
exports["default"] = Select;
