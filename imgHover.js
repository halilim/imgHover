/**
 * Img hover like Google Image search
 */
function imgHover(elems, hoverSrcFunc, hoverDivClass)
{
    var hoverDivClass = hoverDivClass || "photoHover";
    function imgHoverAnim($this, hoverImg, hoverSrc)
    {
        //$("."+hoverDivClass).each(function (){ return divHide(this); });
        $("."+hoverDivClass).map(function (){ return divHide($(this)); });
        var origW = $this.width();
        var origH = $this.height();
        var src = $this.attr("src");
        var targetSrc = hoverSrc;
        var hoverW = hoverImg.width;
        var hoverH = hoverImg.height;
        if (hoverW < origW || hoverH < origH) {
            targetSrc = src;
        }
        var offs = $this.offset();
        if ($this.data("imgHover.div")) {
            var div = $this.data("imgHover.div");
        } else {
            var div = $(
                '<div class="">' + 
                    '<a href="">' +
                        '<img src="" alt="" title="" />' +
                        '<span></span>' +
                    '</a>' +
                '</div>');
            $this.data("imgHover.div", div);
            div.appendTo("body");
        }
        div.data("imgHover.origW", origW);
        div.data("imgHover.origH", origH);
        div.addClass(hoverDivClass);
        div.css({"left" : offs.left-6, "top" : offs.top-6});
        div.find("img").css({"width" : origW, "height" : origH});
        div.find("a").attr({"href": $this.parent("a").attr("href")});
        div.find("img").attr({"src": targetSrc, "alt": $this.attr("alt")});
        div.find("span").text($this.attr("alt"));
        div.show();
        var targetWidth = hoverW;
        var targetHeight = hoverH;
        if (targetWidth < origW) {
            targetWidth = origW;
        }
        if (targetHeight < origH) {
            targetHeight = origH;
        }
        div.data("imgHover.targetWidth", targetWidth);
        div.data("imgHover.targetHeight", targetHeight);
        div.find("img").animate({
            width: targetWidth,
            height: targetHeight
        }, 100);
        div.animate({
            left: '-=' + Math.round((targetWidth-origW)/2),
            top: '-=' + Math.round((targetHeight-origH)/2)
        }, 100);
    }
    function divHide(div)
    {
        div.hide();
        /*var origW = div.data("imgHover.origW");
        var origH = div.data("imgHover.origH");
        var targetWidth = div.data("imgHover.targetWidth");
        var targetHeight = div.data("imgHover.targetHeight");
        div.find("img").animate({
            width: origW,
            height: origH
        }, 100);
        div.animate({
            left: '+=' + Math.round((targetWidth-origW)/2),
            top: '+=' + Math.round((targetHeight-origH)/2)
        }, 100, function (){ $(this).hide(); });*/
    }
    $(elems).mouseenter(function (){
        var $this = $(this);
        var hoverSrc =  hoverSrcFunc($this);
        var hoverImg = new Image();
        if ($this.data("imgHover.hoverImg")) {
            imgHoverAnim($this, $this.data("imgHover.hoverImg"), hoverSrc);
        } else {
            $(hoverImg).load(function (){
                $this.data("imgHover.hoverImg", hoverImg);
                imgHoverAnim($this, hoverImg, hoverSrc);
            });
        }
        hoverImg.src = hoverSrc;
    });
    $("."+hoverDivClass).live('mouseenter ', function() {
        if ($(this).data("imgHover.divCloseTimerId")) {
            clearTimeout($(this).data("imgHover.divCloseTimerId"));
            $(this).removeData("imgHover.divCloseTimerId");
        }
    });
    $("."+hoverDivClass).live('mouseleave', function() {
        (function (div) {
            div.data("imgHover.divCloseTimerId", setTimeout(function () {
                divHide(div);
            }, 250));
        }($(this)));
    });
}