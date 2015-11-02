(function($) {
	var $ = jQuery;
 var PicView = (function() {
 	 function PicView() {
 	 	  this.fadeDuration                = 500;
      this.album             = [];
      this.currentImageIndex = void 0;
      this.init();
    }
  	PicView.prototype.init = function() {
      this.enable();
      this.build();
    };
    PicView.prototype.enable = function() {
      var self = this;
      $('body').on('click', 'a.djImageView', function(event) {
        self.start($(event.currentTarget));
        return false;
      });
    };
    PicView.prototype.build = function() {
      var self = this;
      var str='<div id="picView-container"><div id="picView-overlay"></div><div id="picView-level1"><div id="picView-level2"><div id="picView-level3"><img  id="picView-real"/></div><img src="img/close.png" id="picView-close"/><img src="img/prev.png" id="picView-prev"/><img src="img/next.png" id="picView-next"/></div></div></div>';
	   	$("body").append(str);     
      this.$overlay        = $('#picView-container');
       
      this.$overlay.find('#picView-prev').on('click', function() {
        if (self.currentImageIndex === 0) {
          self.changeImage(self.album.length - 1);
        } else {
          self.changeImage(self.currentImageIndex - 1);
        }
      });

      this.$overlay.find('#picView-next').on('click', function() {
        if (self.currentImageIndex === self.album.length - 1) {
          self.changeImage(0);
        } else {
          self.changeImage(self.currentImageIndex + 1);
        }
      });

      this.$overlay.find('#picView-close').on('click', function() {
        self.end();
      });
    };
     PicView.prototype.start = function($link) {
      var self    = this;
      this.album = [];
      var imageNumber = 0;

      function addToAlbum($link) {
        self.album.push({
          link: $link.attr('data-big')
        });
      }   
      var $links;
			$links = $('.djImageView');
        for (var i = 0; i < $links.length; i = ++i) {
          addToAlbum($($links[i]));
          if ($links[i] === $link[0]) {
            imageNumber = i;
          }
        }
      
      this.changeImage(imageNumber);
    };
      PicView.prototype.changeImage = function(imageNumber) {
       var self = this;
       this.$overlay.show();
       	$("#picView-real",this.$overlay).attr("src",this.album[imageNumber].link);
     
      this.currentImageIndex = imageNumber;
    };
     PicView.prototype.end = function() {  
      this.$overlay.hide();      
    };

    return PicView;
 	})();
   
   
   $(function() {
    var picView = new PicView();
  }); 
}).call(this);
 
$(function(){
	$("h2").click(function(){
		var s='<a class="djImageView" data-big="img/demopage/image-1.jpg"  ><img   src="img/demopage/thumb-1.jpg"  /></a>';
		$(".image-row").append(s);
		});
	})