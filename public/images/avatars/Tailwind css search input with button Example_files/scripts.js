function initbbbootstrap(){var o=$(".swiper-button-prev");var e=$(".swiper-button-next");o.on("click",function(){$(this).closest(".carousel ").find(".single-carousel").slick("slickPrev")}),e.on("click",function(){$(this).closest(".carousel").find(".single-carousel").slick("slickNext")}),$(".listing-carousel").slick({infinite:!0,lazyLoad:"ondemand",slidesToShow:5,dots:!1,arrows:!1,autoplay:!1,autoplaySpeed:4e3,centerMode:!1,centerPadding:"0",responsive:[{breakpoint:3e3,settings:{slidesToShow:4}},{breakpoint:1224,settings:{slidesToShow:3}},{breakpoint:1024,settings:{slidesToShow:2}},{breakpoint:800,settings:{slidesToShow:1}}]}),o.on("click",function(){$(this).closest(".mylist-carousel").find(".listing-carousel").slick("slickPrev")}),e.on("click",function(){$(this).closest(".mylist-carousel").find(".listing-carousel").slick("slickNext")}),$(".client-carousel").slick({infinite:!0,slidesToShow:5,dots:!1,arrows:!1,centerMode:!0,responsive:[{breakpoint:1224,settings:{slidesToShow:4,centerMode:!1}},{breakpoint:768,settings:{slidesToShow:2,centerMode:!0}}]}),$(".to-top").on("click",function(o){return o.preventDefault(),$("html, body").animate({scrollTop:0},800),!1}),$(window).on("scroll",function(o){$(this).scrollTop()>150?$(".to-top").fadeIn(500):$(".to-top").fadeOut(500)});$(".modal-open").on("click",function(o){o.preventDefault(),$(".modal").fadeIn(),$("html, body").addClass("hid-body")}),$(".close-reg").on("click",function(){$(".modal").fadeOut(),$("html, body").removeClass("hid-body")});$(".modal-open-embed").on("click",function(o){o.preventDefault(),$(".modal-embed").fadeIn(),$("html, body").addClass("hid-body")}),$(".close-reg-embed").on("click",function(){$(".modal-embed").fadeOut(),$("html, body").removeClass("hid-body")});$(".modal-open-modal_download_thanks").on("click",function(o){o.preventDefault(),$(".modal_download_thanks").fadeIn(),$("html, body").addClass("hid-body")}),$(".close-reg-modal_download_thanks").on("click",function(){$(".modal_download_thanks").fadeOut(),$("html, body").removeClass("hid-body")}),$(".chosen-select").niceSelect({polyfill:!1,onInit:function(){this.output=$(".distance-title span").html(this.$element.val())},onSlide:function(o,e){this.output.html(e)}}),$(".show-search-button").on("click",function(){$(".vis-header-search").slideToggle(500)})}
$(document).ready(function(){initbbbootstrap();});