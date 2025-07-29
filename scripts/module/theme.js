let system = 'light';  // default value

const themeChanged = (() => {
    const value = $('.theme').val();
    if (!value) {
        $('.theme').find('mdui-segmented-button[value="system"]').click();
        $('.theme').val('system');
        return;
    }
    localStorage.setItem('theme', value);
    
    // 移除所有主题类
    $('body').removeClass('dark-theme light-theme');
    $('body').removeAttr('data-theme');
    
    switch (value) {
        case 'light':
            $('#theme').attr('href', 'assets/light.css');
            $('body').addClass('light-theme').attr('data-theme', 'light');
            if($('style#classic').length) $('style').remove('#classic');
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23101010&line=%236b63ff');
            break;
        case 'dark':
            $('#theme').attr('href', 'assets/dark.css');
            $('body').addClass('dark-theme').attr('data-theme', 'dark');
            if($('style#classic').length) $('style').remove('#classic');
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23ffffff&line=%236b63ff');
            break;
        case 'system':
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) system = 'dark';
            $('#theme').attr('href', `assets/${system}.css`);
            $('body').addClass(`${system}-theme`).attr('data-theme', system);
            if($('style#classic').length) $('style').remove('#classic');
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23101010&line=%236b63ff');
            if (system == 'dark') {
                $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23ffffff&line=%236b63ff');
            }
            break;
        case 'classic':
            const classic = `<style id="classic">
    div.background {
        background-image: url('assets/image/classic.webp');
        transform: none;
        filter: none;
    }
</style>`;
            $('#theme').attr('href', 'assets/light.css');
            $('body').addClass('light-theme').attr('data-theme', 'light');
            // document.adoptedStyleSheets.push(classic);
            // Object.isExtensible(document.adoptedStyleSheets) === false
            // on some browsers
            if(!$('style#classic').length) $('body').append(classic);
            $('[alt="Stars Over Time"]').attr('src', 'https://starchart.cc/teaSummer/MCiSEE.svg?background=%2300000000&axis=%23101010&line=%236b63ff');
            break;
    }
});
$('.theme').change(themeChanged);
themeChanged();

// 监听变化
$(window.matchMedia('(prefers-color-scheme: dark)')).change((event) => {
    system = 'light';
    if (event.matches) system = 'dark';
    if ($('.theme').val() == 'system') themeChanged();
});

// 移动端视图
const device = browser.parse();
if (device.device == 'Mobile') {
    $.ajax({
        url: 'assets/mobile.css',
        success: (data) => $('head').append(`<style id="mobile">${data}</style>`)
    });
}
