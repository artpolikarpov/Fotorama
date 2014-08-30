document.write(
    '<div id="html">' +
      '<div class="fotorama" data-width="700" data-height="467" data-auto="false" id="fotorama">' +
        '<img src="test/i/okonechnikov/1-lo.jpg">' +
        '<img src="test/i/okonechnikov/2-lo.jpg">' +
        '<img src="test/i/okonechnikov/3-lo.jpg">' +
        '<img src="test/i/okonechnikov/4-lo.jpg">' +
        '<img src="test/i/okonechnikov/5-lo.jpg">' +
      '</div>' +
    '</div>'
);

describe('Destroy', function () {
  var $fotorama, fotorama, data, $html, html, htmlWithFotorama;

  it('$(el).fotorama() changes the DOM', function () {
    $html = $('#html');
    html = $html.html();

    $fotorama = $('#fotorama').fotorama();
    fotorama = $fotorama.data('fotorama');
    data = fotorama.data;

    htmlWithFotorama = $html.html();
    expect(html).not.toBe(htmlWithFotorama);
  });

  it('fotorama.destroy() leaves nothing extra', function () {
    fotorama.destroy();

    expect(html).toBe($html.html());
  });

  it('even if fullscreen', function () {
    $fotorama.fotorama({allowFullScreen: true});

    htmlWithFotorama = $html.html();

    fotorama.requestFullScreen();

    expect(fotorama.fullScreen).toBe(true);

    fotorama.destroy();

    expect(fotorama.fullScreen).toBe(false);
    expect(html).toBe($html.html());
  });

  it('fotorama.load([{}, {}, {}]) can revive the fotorama', function () {
    var photos = [];

    for (var _i = 1; _i <= 5; _i++) {
      photos.push({img: 'test/i/okonechnikov/' + _i + '-lo.jpg'});
    }

    fotorama.load(photos);

    expect(htmlWithFotorama).toBe($html.html());
  });

  it('It seems that all is well', function () {
    // test some functions after all

    fotorama.setOptions({nav: 'thumbs', thumbWidth: '39px'});
    expect($('.fotorama__nav__frame--thumb').width()).toBe(39);

    fotorama.show({index: 1, time: 0});

    waitsFor(function () {
      return $('.fotorama__stage__frame.fotorama__active .fotorama__img').size();
    }, 'Wait for the img...', 100);

    runs(function () {
      expect(fotorama.activeIndex).toBe(1);
      expect($('.fotorama__stage__frame.fotorama__active .fotorama__img').attr('src')).toBe('test/i/okonechnikov/2-lo.jpg');
    });
  });

  it('.destoy() on fotorama:ready should not to break anything', function(done) {
    var $fotorama = $('#fotorama');

    $fotorama
        .on('fotorama:ready', function(e, fotorama) {
          fotorama.destroy();
          $fotorama.fotorama();

          var fotorama = $fotorama.data('fotorama');
          expect(fotorama.data).toBeTruthy();
          done();
        })
        .fotorama();
  })
});