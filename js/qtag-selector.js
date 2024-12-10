import $ from "jquery";

// Styles
import "../css/qtags.css";

$("#qtag-selector-btn").on("click", function () {
  $("#qtag-selector").toggle();
});

$(function () {
  $(".qtag-btn").on("click", function () {
    const children = $(this).parent().parent().find(".tag-child-btn");
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected").addClass("unselected");
        children.removeClass("selected").addClass("unselected");
    }else if ($(this).hasClass("unselected")) {
        $(this).removeClass("unselected").addClass("selected");
        children.removeClass("unselected").addClass("selected");
    }
  });
  $(".qtag-child-btn").on("click", function () {
    const siblings = $(this).parent().parent().find(".tag-child-btn")
    const parent = $(this).parent().parent().parent().find(".tag-btn");
     if ($(this).hasClass("selected")) {
        $(this).removeClass("selected").addClass("unselected");
        if (siblings.filter(".selected").length == 0) {
            parent.removeClass("selected").addClass("unselected");
        }
     }
    else if ($(this).hasClass("unselected")) {
        $(this).removeClass("unselected").addClass("selected");
        if (siblings.filter(".selected").length > 0) {
            parent.removeClass("unselected").addClass("selected");
        }
    }
  });
});
