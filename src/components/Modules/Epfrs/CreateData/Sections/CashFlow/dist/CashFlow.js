"use strict";
exports.__esModule = true;
var SectionCardSingleGrid_1 = require("@/components/Attributes/Cards/SectionCardSingleGrid");
var RowSingle_1 = require("@/components/Attributes/Rows/Flexs/RowSingle");
var Checkbox_1 = require("@/components/Forms/Checkbox");
var Select_1 = require("@/components/Forms/Select");
var TextArea_1 = require("@/components/Forms/TextArea");
var react_1 = require("react");
var AnnualExpenseCashFlow_1 = require("./AnnualExpense/AnnualExpenseCashFlow");
var AnnualIncomeCashFlow_1 = require("./AnnualIncome/AnnualIncomeCashFlow");
var AnnualNetCashFlow_1 = require("./AnnualNetCashFlow/AnnualNetCashFlow");
var navigationSection_1 = require("@/store/epfrPage/navigationSection");
var HeadingPrimarySection_1 = require("@/components/Attributes/Sections/HeadingPrimarySection");
var useScrollPosition_1 = require("@/hooks/useScrollPosition");
var cashFlow_1 = require("@/store/epfrPage/createData/cashFlow");
var HeadingSecondaryDynamicGrid_1 = require("@/components/Attributes/Sections/HeadingSecondaryDynamicGrid");
var RowDouble_1 = require("@/components/Attributes/Rows/Flexs/RowDouble");
var helper_1 = require("@/libs/helper");
var CashFlow = function (props) {
    var setData = function (params) {
        console.log(params);
    };
    var getPfrLength = helper_1.getLength(props.pfrType);
    var fillInformation = [
        { id: 0, name: "No" },
        { id: 1, name: "Yes" },
    ];
    var showDetailData = navigationSection_1.useNavigationSection().showDetailData;
    var scrollPosition = useScrollPosition_1.useScrollPosition(3);
    var saveData = function (params) {
        showDetailData(params);
    };
    var _a = cashFlow_1.useCashFlow(), need = _a.need, reason = _a.reason, totalNetSurplus = _a.totalNetSurplus;
    var _b = react_1.useState(false), notReviewAll = _b[0], setNotReviewAll = _b[1];
    // let post = postPfr(1)
    return (react_1["default"].createElement("div", { id: props.id },
        react_1["default"].createElement("div", { id: "section-header-3", className: "sticky top-0 z-10 " + (scrollPosition === "okSec3" ? "bg-white py-1 ease-in shadow-lg" : "") },
            react_1["default"].createElement(HeadingPrimarySection_1["default"], { className: "mx-8 2xl:mx-60 " + (scrollPosition === "okSec3"
                    ? "text-gray-light text-xl font-bold mb-5 mt-5"
                    : "text-2xl font-bold mb-10 mt-10") }, "Section 3. Cash Flow")),
        !notReviewAll ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(HeadingSecondaryDynamicGrid_1["default"], { className: "mx-8 2xl:mx-60 " + (props.pfrType == 2
                    ? "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
                    : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"), pfrType: props.pfrType }, "3.1 Annual Income"),
            react_1["default"].createElement(AnnualIncomeCashFlow_1["default"], { pfrType: props.pfrType }),
            react_1["default"].createElement(HeadingSecondaryDynamicGrid_1["default"], { className: "mx-8 2xl:mx-60 " + (props.pfrType == 2
                    ? "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
                    : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"), pfrType: props.pfrType }, "3.2 Annual Expense"),
            react_1["default"].createElement(AnnualExpenseCashFlow_1["default"], { pfrType: props.pfrType }))) : (""),
        notReviewAll ? (react_1["default"].createElement(SectionCardSingleGrid_1["default"], { className: "mx-8 2xl:mx-60" },
            react_1["default"].createElement(RowSingle_1["default"], null,
                react_1["default"].createElement(Checkbox_1["default"], { isChecked: notReviewAll, onChange: function () { return setNotReviewAll(!notReviewAll); }, lableStyle: "text-sm font-normal text-gray-light", label: "The Client would not like their cash flow to be taken into\n            consideration for the Needs Analysis and Recommendation(s)" })),
            react_1["default"].createElement(RowSingle_1["default"], null,
                react_1["default"].createElement(TextArea_1["default"], { className: "my-4", label: "Reason is needed if Net Worth \u2264 $0", defaultValue: "test text area" })))) : (""),
        react_1["default"].createElement(HeadingSecondaryDynamicGrid_1["default"], { className: "mx-8 2xl:mx-60 " + (props.pfrType == 2
                ? "lg:grid-cols-6 sm:grid-cols-6 md:grid-cols-6"
                : "lg:grid-cols-1 sm:grid-cols-1 md:grid-cols-1"), pfrType: props.pfrType }, "3.3 Annual Net Cash Flow"),
        react_1["default"].createElement(AnnualNetCashFlow_1["default"], { pfrType: props.pfrType }),
        !notReviewAll ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(SectionCardSingleGrid_1["default"], { className: "mx-8 2xl:mx-60" },
                react_1["default"].createElement(RowDouble_1["default"], null, (getPfrLength === null || getPfrLength === void 0 ? void 0 : getPfrLength.length) &&
                    getPfrLength.map(function (data, index) { return (react_1["default"].createElement("div", { className: "flex-1", key: index },
                        props.pfrType > 1 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("h3", { key: "heading-secondary-" + index, className: "w-full mb-4 text-base font-bold" },
                                "Client ",
                                ++index),
                            react_1["default"].createElement("p", { className: "text-sm font-normal text-gray-light" }, "Do you have any plans or are there any factors within\n                          the next 12 months which may significantly increase or\n                          decrease your current income and expenditure position\n                          (eg. Receiving an inheritance or borrowing money for\n                          investment or purchase of a holiday home, etc.) ?"))) : (react_1["default"].createElement("p", { className: "text-sm font-normal text-gray-light" }, "Do you have any plans or are there any factors within\n                          the next 12 months which may significantly increase or\n                          decrease your current income and expenditure position\n                          (eg. Receiving an inheritance or borrowing money for\n                          investment or purchase of a holiday home, etc.) ?")),
                        react_1["default"].createElement(Select_1["default"], { value: "", className: "my-4", datas: fillInformation, handleChange: function (event) {
                                return setData(eval(event.target.value));
                            } }))); }))),
            react_1["default"].createElement(SectionCardSingleGrid_1["default"], { className: "mx-8 2xl:mx-60" },
                react_1["default"].createElement(RowDouble_1["default"], null, (getPfrLength === null || getPfrLength === void 0 ? void 0 : getPfrLength.length) &&
                    getPfrLength.map(function (data, index) { return (react_1["default"].createElement("div", { className: "flex-1", key: index },
                        props.pfrType > 1 ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement("h3", { key: "heading-secondary-" + index, className: "w-full mb-10 text-base font-bold" },
                                "Client ",
                                ++index))) : (""),
                        react_1["default"].createElement(Checkbox_1["default"], { isChecked: need ? (need[index] == 1 ? true : false) : false, onChange: function () { return setNotReviewAll(!notReviewAll); }, lableStyle: "text-sm font-normal text-gray-light", label: "The Client would not like their cash flow to be taken into\n            consideration for the Needs Analysis and Recommendation(s)" }))); })),
                react_1["default"].createElement(RowDouble_1["default"], null, (getPfrLength === null || getPfrLength === void 0 ? void 0 : getPfrLength.length) &&
                    getPfrLength.map(function (data, index) { return (react_1["default"].createElement(react_1["default"].Fragment, null, need ? (need[index] == 1 ? ("") : (react_1["default"].createElement("div", { className: "flex-1", key: index },
                        react_1["default"].createElement(TextArea_1["default"], { className: "my-4", defaultValue: "test text area", needValidation: true, logic: need ? (need[index] == 1 ? true : false) : false })))) : (react_1["default"].createElement("div", { className: "flex-1", key: index },
                        react_1["default"].createElement(TextArea_1["default"], { className: "my-4", defaultValue: "test text area", needValidation: true, logic: need ? (need[index] == 1 ? true : false) : false }))))); }))))) : (""),
        react_1["default"].createElement("div", { className: "mt-20 mb-20 border-b border-gray-soft-strong" })));
};
exports["default"] = CashFlow;
