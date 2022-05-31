let _input = '#1F4A79';
const _hex = { A: 10, B: 11, C: 12, D: 13, E: 14, F: 15 };

const _backgroundOn = {
    Black: 15, //#0f0f0f
    White: 255 //#fff
};

const _opacity_15 = 0.15;
const _opacity_35 = 0.35;
const _opacity_65 = 0.65;
const _opacity_20 = 0.20;
const _opacity_80 = 0.80;
const _opacity_85 = 0.85;

/*----------------------test-------------------------- */
let rgb = [31, 74, 121]; // #1F4A79 - 31, 74,121
passthroughOver('.box-40', '--color-name-40', mixer(_backgroundOn.White, rgb, _opacity_20));
passthroughOver('.box-30', '--color-name-30', mixer(_backgroundOn.White, rgb, _opacity_35));
passthroughOver('.box-20', '--color-name-20', mixer(_backgroundOn.White, rgb, _opacity_65));
passthroughOver('.box-10', '--color-name-10', mixer(_backgroundOn.White, rgb, _opacity_85));
passthroughOver('.box-50', '--color-name-50', mixer(_backgroundOn.Black, rgb, 0));
passthroughOver('.box-60', '--color-name-60', mixer(_backgroundOn.Black, rgb, _opacity_35));
passthroughOver('.box-70', '--color-name-70', mixer(_backgroundOn.Black, rgb, _opacity_65));
passthroughOver('.box-80', '--color-name-80', mixer(_backgroundOn.Black, rgb, _opacity_85));

/* attach events */
document.getElementById('colorMe').addEventListener('input', (e) => {
    _input = document
        .getElementById('colorMe')
        .value.substring(1)
        .toUpperCase();
    let rgb = convertHexToRGB(_input); 

    //----------------- display colors
    passthroughOver('.box-40', '--color-name-40', mixer(_backgroundOn.White, rgb, _opacity_20));
    passthroughOver('.box-30', '--color-name-30', mixer(_backgroundOn.White, rgb, _opacity_35));
    passthroughOver('.box-20', '--color-name-20', mixer(_backgroundOn.White, rgb, _opacity_65));
    passthroughOver('.box-10', '--color-name-10', mixer(_backgroundOn.White, rgb, _opacity_85));
    passthroughOver('.box-50', '--color-name-50', mixer(_backgroundOn.Black, rgb, 0));
    passthroughOver('.box-60', '--color-name-60', mixer(_backgroundOn.Black, rgb, _opacity_35));
    passthroughOver('.box-70', '--color-name-70', mixer(_backgroundOn.Black, rgb, _opacity_65));
    passthroughOver('.box-80', '--color-name-80', mixer(_backgroundOn.Black, rgb, _opacity_85));
});

function convertHexToRGB(input) {
    let switch_cnt = 1;
    let total = 0;
    let index = 0;
    let rgb = [];

    [...input].forEach((c) => {
        let v = +(isNaN(c) ? _hex[c] : c);
        switch (switch_cnt++) {
            case 1:
                total = v * 16;
                break;
            case 2:
                total += v;
                rgb[index++] = total;
                switch_cnt = 1;
                break;
            default:
                total = 0;
        }
    });
    return rgb;
}

function convertToHex(v) {
    let hex = v.toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
}

function RGBToHex(r, g, b) {
    return `#${convertToHex(r)}${convertToHex(g)}${convertToHex(b)}`;
}

function mixer(overlay, background, opacity) {
    let r = Math.round(opacity * overlay + (1 - opacity) * background[0]);
    let g = Math.round(opacity * overlay + (1 - opacity) * background[1]);
    let b = Math.round(opacity * overlay + (1 - opacity) * background[2]);
    return RGBToHex(r, g, b);
}
function blend(overlay, background, opacity) {
    return Math.round(opacity * overlay + (1 - opacity) * background);
}

function passthroughOver(box, background, color) {
    const boxSelector = document.querySelector(box);
    let p = document.querySelector(`${box} div.title p`);
    p.innerHTML = color;
    boxSelector.style.setProperty(background, color);
}