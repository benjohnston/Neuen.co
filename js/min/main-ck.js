jQuery(document).ready(function(e){function i(){var i=e(".header").height(),n=e(window).height(),s=n-i,a=e(window).width();e(".blurred-bg").css("clip","rect("+s+"px, "+a+"px, "+n+"px, 0px)")}e(".menu-trigger").on("click",function(i){i.preventDefault(),e("#main-content").addClass("move-out"),e("#main-nav").addClass("is-visible"),e(".shadow-layer").addClass("is-visible")}),e(".close-menu").on("click",function(i){i.preventDefault(),e("#main-content").removeClass("move-out"),e("#main-nav").removeClass("is-visible"),e(".shadow-layer").removeClass("is-visible")}),i(),e(window).on("resize",function(){i()})});