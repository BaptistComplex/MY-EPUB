const paper =
    document.getElementById('paper');

const textInput =
    document.getElementById('textInput');

const titleInput =
    document.getElementById('titleInput');

const authorInput =
    document.getElementById('authorInput');

const footerInput =
    document.getElementById('footerInput');


const bodyTextControl =
    document.getElementById('bodyTextControl');

const titleTextControl =
    document.getElementById('titleTextControl');

const authorTextControl =
    document.getElementById('authorTextControl');

const footerTextControl =
    document.getElementById('footerTextControl');


const darkMode =
    document.getElementById('darkMode');

const backgroundColor =
    document.getElementById('backgroundColor');

const textColor =
    document.getElementById('textColor');


const backgroundImageInput =
    document.getElementById('backgroundImageInput');

const removeBackgroundImage =
    document.getElementById('removeBackgroundImage');

const backgroundImageLayer =
    paper.querySelector(
        '.background-image-layer'
    );


const resetButton =
    document.getElementById('resetButton');

const saveButton =
    document.getElementById('saveButton');


/*
    저장 이미지의 고정 크기입니다.

    브라우저 창의 크기와 관계없이
    항상 이 크기를 기준으로 이미지를 만듭니다.
*/
const EXPORT_SIZE = 1000;


/*
    미리보기 크기 조절

    실제 paper는 항상 1000 × 1000 기준으로 유지하고,
    화면에서는 paper-frame의 폭에 맞춰
    전체를 같은 비율로 축소해서 보여줍니다.

    따라서 PC와 모바일에서
    여백, 글자 크기, 요소 위치의 비율이
    동일하게 유지됩니다.
*/

const paperFrame =
    document.querySelector('.paper-frame');


function updatePaperScale() {

    if (!paperFrame) {
        return;
    }


    const frameWidth =
        paperFrame.clientWidth;


    if (!frameWidth) {
        return;
    }


    const scale =
        Math.min(
            frameWidth / EXPORT_SIZE,
            1
        );


    paper.style.setProperty(
        '--paper-scale',
        scale
    );

}


/*
    화면 크기가 바뀌었을 때
    미리보기 비율을 다시 계산합니다.
*/

window.addEventListener(
    'resize',
    updatePaperScale
);


/*
    preview 영역 자체의 크기가 바뀌는 경우에도
    다시 계산합니다.
*/

if (
    typeof ResizeObserver !==
    'undefined' &&
    paperFrame
) {

    const paperResizeObserver =
        new ResizeObserver(
            updatePaperScale
        );


    paperResizeObserver.observe(
        paperFrame
    );

}


/*
    초기 미리보기 크기 계산
*/

updatePaperScale();


/* 기본 설정 */

const defaultState = {

    bodyFont: 'gothic',
    titleFont: 'gothic',
    authorFont: 'gothic',
    footerFont: 'gothic',

    bodySize: 35,
    titleSize: 40,
    authorSize: 40,
    footerSize: 25,

    bodyAlign: 'left',
    titleAlign: 'left',
    authorAlign: 'left',
    footerAlign: 'center',

    lineHeight: '1.8',

    background: '#ffffff',
    backgroundImage: '',

    textColor: '#333333',

    dark: false

};


let state = {
    ...defaultState
};


/* 본문 자동 높이 */

function resizeTextInput() {

    textInput.style.height =
        'auto';

    textInput.style.height =
        `${textInput.scrollHeight}px`;

}

textInput.addEventListener(
    'input',
    resizeTextInput
);

resizeTextInput();


/* 설정창 입력 → 미리보기 */

bodyTextControl.addEventListener(
    'input',
    () => {

        textInput.value =
            bodyTextControl.value;

        resizeTextInput();

    }
);


titleTextControl.addEventListener(
    'input',
    () => {

        titleInput.value =
            titleTextControl.value;

    }
);


authorTextControl.addEventListener(
    'input',
    () => {

        authorInput.value =
            authorTextControl.value;

    }
);


footerTextControl.addEventListener(
    'input',
    () => {

        footerInput.value =
            footerTextControl.value;

    }
);


/* 글꼴 */

document.querySelectorAll(
    '.font-button'
).forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const target =
                    button.dataset.target;

                const font =
                    button.dataset.font;


                state[target + 'Font'] =
                    font;


                const targetElement = {

                    body:
                        textInput,

                    title:
                        titleInput,

                    author:
                        authorInput,

                    footer:
                        footerInput

                }[target];


                targetElement.classList.remove(
                    'font-gothic',
                    'font-batang',
                    'font-myeongjo'
                );


                targetElement.classList.add(
                    `font-${font}`
                );


                document
                    .querySelectorAll(
                        `.font-button[data-target="${target}"]`
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                'active'
                            );

                        }
                    );


                button.classList.add(
                    'active'
                );


                if (target === 'body') {

                    resizeTextInput();

                }

            }
        );

    }
);


/* 글자 크기 */

const sizeControls = {

    body: {

        input:
            document.getElementById(
                'bodySize'
            ),

        value:
            document.getElementById(
                'bodySizeValue'
            ),

        element:
            textInput

    },


    title: {

        input:
            document.getElementById(
                'titleSize'
            ),

        value:
            document.getElementById(
                'titleSizeValue'
            ),

        element:
            titleInput

    },


    author: {

        input:
            document.getElementById(
                'authorSize'
            ),

        value:
            document.getElementById(
                'authorSizeValue'
            ),

        element:
            authorInput

    },


    footer: {

        input:
            document.getElementById(
                'footerSize'
            ),

        value:
            document.getElementById(
                'footerSizeValue'
            ),

        element:
            footerInput

    }

};


Object.entries(
    sizeControls
).forEach(
    ([target, control]) => {

        control.input.addEventListener(
            'input',
            () => {

                const size =
                    Number(
                        control.input.value
                    );


                state[target + 'Size'] =
                    size;


                control.element.style.fontSize =
                    `${size}px`;


                control.value.textContent =
                    `${size}px`;


                if (target === 'body') {

                    resizeTextInput();

                }

            }
        );

    }
);


/* 정렬 */

document.querySelectorAll(
    '.align-button'
).forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const target =
                    button.dataset.target;

                const align =
                    button.dataset.align;


                state[target + 'Align'] =
                    align;


                const targetElement = {

                    body:
                        textInput,

                    title:
                        titleInput,

                    author:
                        authorInput,

                    footer:
                        footerInput

                }[target];


                targetElement.classList.remove(
                    'align-left',
                    'align-center',
                    'align-right'
                );


                targetElement.classList.add(
                    `align-${align}`
                );


                document
                    .querySelectorAll(
                        `.align-button[data-target="${target}"]`
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                'active'
                            );

                        }
                    );


                button.classList.add(
                    'active'
                );

            }
        );

    }
);


/* 줄 간격 */

document.querySelectorAll(
    '.line-button'
).forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const line =
                    button.dataset.line;


                state.lineHeight =
                    line;


                paper.classList.remove(
                    'line-height-1-5',
                    'line-height-1-8',
                    'line-height-2-1'
                );


                paper.classList.add(
                    `line-height-${line.replace('.', '-')}`
                );


                document
                    .querySelectorAll(
                        '.line-button'
                    )
                    .forEach(
                        item => {

                            item.classList.remove(
                                'active'
                            );

                        }
                    );


                button.classList.add(
                    'active'
                );


                resizeTextInput();

            }
        );

    }
);


/* 배경 색상 */

document.querySelectorAll(
    '.color-button'
).forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const color =
                    button.dataset.color;


                state.background =
                    color;


                paper.style.backgroundColor =
                    color;


                backgroundColor.value =
                    color;


                darkMode.checked =
                    false;


                state.dark =
                    false;


                paper.classList.remove(
                    'dark'
                );

            }
        );

    }
);


backgroundColor.addEventListener(
    'input',
    () => {

        const color =
            backgroundColor.value;


        state.background =
            color;


        paper.style.backgroundColor =
            color;


        darkMode.checked =
            false;


        state.dark =
            false;


        paper.classList.remove(
            'dark'
        );

    }
);


/*
    배경 이미지
    ─────────────────────────────

    사용자가 선택한 이미지를
    가운데 기준으로 정사각형으로 잘라
    PNG 데이터로 변환합니다.

    이렇게 하면 실제 배경 이미지 자체가
    1 : 1 비율이 됩니다.
*/

function cropImageToSquare(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                event => {

                    const image =
                        new Image();


                    image.onload =
                        () => {

                            const size =
                                Math.min(
                                    image.naturalWidth,
                                    image.naturalHeight
                                );


                            const sourceX =
                                (
                                    image.naturalWidth -
                                    size
                                ) / 2;


                            const sourceY =
                                (
                                    image.naturalHeight -
                                    size
                                ) / 2;


                            const canvas =
                                document.createElement(
                                    'canvas'
                                );


                            /*
                                업로드 이미지도
                                1000 × 1000 기준으로
                                만들어 둡니다.
                            */

                            canvas.width =
                                EXPORT_SIZE;

                            canvas.height =
                                EXPORT_SIZE;


                            const context =
                                canvas.getContext(
                                    '2d'
                                );


                            context.drawImage(

                                image,

                                sourceX,
                                sourceY,
                                size,
                                size,

                                0,
                                0,
                                EXPORT_SIZE,
                                EXPORT_SIZE

                            );


                            resolve(
                                canvas.toDataURL(
                                    'image/png'
                                )
                            );

                        };


                    image.onerror =
                        () => {

                            reject(
                                new Error(
                                    '이미지를 불러올 수 없습니다.'
                                )
                            );

                        };


                    image.src =
                        event.target.result;

                };


            reader.onerror =
                () => {

                    reject(
                        new Error(
                            '이미지 파일을 읽을 수 없습니다.'
                        )
                    );

                };


            reader.readAsDataURL(
                file
            );

        }
    );

}


/*
    배경 이미지 표시
*/

function applyBackgroundImage(
    imageData
) {

    state.backgroundImage =
        imageData;


    backgroundImageLayer.style.backgroundImage =
        `url("${imageData}")`;


    paper.classList.add(
        'has-background-image'
    );

}


/*
    배경 이미지 제거
*/

function clearBackgroundImage() {

    state.backgroundImage =
        '';


    backgroundImageLayer.style.backgroundImage =
        '';


    paper.classList.remove(
        'has-background-image'
    );


    backgroundImageInput.value =
        '';

}


/*
    이미지 업로드
*/

backgroundImageInput.addEventListener(
    'change',
    async () => {

        const file =
            backgroundImageInput.files[0];


        if (!file) {
            return;
        }


        if (!file.type.startsWith('image/')) {

            alert(
                '이미지 파일만 업로드할 수 있습니다.'
            );

            backgroundImageInput.value =
                '';

            return;

        }


        try {

            const imageData =
                await cropImageToSquare(
                    file
                );


            applyBackgroundImage(
                imageData
            );


        } catch (error) {

            console.error(
                error
            );


            alert(
                '배경 이미지를 불러오지 못했습니다.'
            );

            backgroundImageInput.value =
                '';

        }

    }
);


/*
    이미지 제거
*/

removeBackgroundImage.addEventListener(
    'click',
    clearBackgroundImage
);


/* 글자색 */

document.querySelectorAll(
    '.text-color-button'
).forEach(
    button => {

        button.addEventListener(
            'click',
            () => {

                const color =
                    button.dataset.color;


                state.textColor =
                    color;


                paper.style.color =
                    color;


                textColor.value =
                    color;

            }
        );

    }
);


textColor.addEventListener(
    'input',
    () => {

        const color =
            textColor.value;


        state.textColor =
            color;


        paper.style.color =
            color;

    }
);


/* 어두운 배경 */

darkMode.addEventListener(
    'change',
    () => {

        state.dark =
            darkMode.checked;


        paper.classList.toggle(
            'dark',
            state.dark
        );

    }
);


/* 초기화 */

resetButton.addEventListener(
    'click',
    () => {

        state = {
            ...defaultState
        };


        /* 입력값 */

        textInput.value =
            '';

        titleInput.value =
            '';

        authorInput.value =
            '';

        footerInput.value =
            '';


        bodyTextControl.value =
            '';

        titleTextControl.value =
            '';

        authorTextControl.value =
            '';

        footerTextControl.value =
            '';


        /* 본문 */

        textInput.className =
            'text-input font-gothic align-left';

        textInput.style.fontSize =
            '35px';


        /* 제목 */

        titleInput.className =
            'title-input font-gothic align-left';

        titleInput.style.fontSize =
            '40px';


        /* 작가 */

        authorInput.className =
            'author-input font-gothic align-left';

        authorInput.style.fontSize =
            '40px';


        /* 하단 */

        footerInput.className =
            'footer-input font-gothic align-center';

        footerInput.style.fontSize =
            '25px';


        /* 본문 높이 */

        resizeTextInput();


        /* 줄 간격 */

        paper.classList.remove(
            'line-height-1-5',
            'line-height-1-8',
            'line-height-2-1'
        );


        paper.classList.add(
            'line-height-1-8'
        );


        /* 배경 */

        paper.style.backgroundColor =
            '#ffffff';


        backgroundColor.value =
            '#ffffff';


        /* 배경 이미지 */

        clearBackgroundImage();


        /* 글자색 */

        paper.style.color =
            '#333333';


        textColor.value =
            '#333333';


        /* 어두운 배경 */

        darkMode.checked =
            false;


        paper.classList.remove(
            'dark'
        );


        /* 크기 조절 */

        document.getElementById(
            'bodySize'
        ).value =
            35;


        document.getElementById(
            'titleSize'
        ).value =
            40;


        document.getElementById(
            'authorSize'
        ).value =
            40;


        document.getElementById(
            'footerSize'
        ).value =
            25;


        /* 크기 표시 */

        document.getElementById(
            'bodySizeValue'
        ).textContent =
            '35px';


        document.getElementById(
            'titleSizeValue'
        ).textContent =
            '40px';


        document.getElementById(
            'authorSizeValue'
        ).textContent =
            '40px';


        document.getElementById(
            'footerSizeValue'
        ).textContent =
            '25px';


        /* 글꼴 버튼 */

        document.querySelectorAll(
            '.font-button'
        ).forEach(
            button => {

                button.classList.toggle(
                    'active',
                    button.dataset.font ===
                        'gothic'
                );

            }
        );


        /* 정렬 버튼 */

        document.querySelectorAll(
            '.align-button'
        ).forEach(
            button => {

                const target =
                    button.dataset.target;


                const defaultAlign =
                    defaultState[
                        target + 'Align'
                    ];


                button.classList.toggle(
                    'active',
                    button.dataset.align ===
                        defaultAlign
                );

            }
        );


        /* 줄 간격 버튼 */

        document.querySelectorAll(
            '.line-button'
        ).forEach(
            button => {

                button.classList.toggle(
                    'active',
                    button.dataset.line ===
                        '1.8'
                );

            }
        );

    }
);


/*
    이미지 저장
    ─────────────────────────────

    가장 중요한 부분입니다.

    화면에 표시되는 paper의 실제 크기를
    저장 크기로 사용하지 않습니다.

    항상 1000 × 1000px짜리 복제본을 만든 뒤
    그 복제본을 html2canvas로 저장합니다.

    따라서 브라우저 창의 폭이 바뀌어도
    글자 크기와 요소의 비율이 동일합니다.
*/

saveButton.addEventListener(
    'click',
    async () => {

        saveButton.disabled =
            true;

        saveButton.textContent =
            '저장 중...';


        let capturePaper =
            null;


        try {

            /*
                현재 미리보기 복제
            */

            capturePaper =
                paper.cloneNode(true);


            /*
                화면에서 미리보기를 축소하기 위해
                적용된 transform을 저장할 때는 제거합니다.

                저장본은 항상 1000 × 1000
                원래 크기로 렌더링되어야 합니다.
            */

            capturePaper.style.setProperty('--paper-scale', '1');
capturePaper.style.transform = 'none';

capturePaper.style.border = 'none';

capturePaper.style.position = 'fixed';
capturePaper.style.left = '-100000px';
capturePaper.style.top = '0';
capturePaper.style.width = `${EXPORT_SIZE}px`;
capturePaper.style.height = `${EXPORT_SIZE}px`;
capturePaper.style.aspectRatio = 'auto';


            document.body.appendChild(
                capturePaper
            );


            /*
                원본 입력 요소 찾기
            */

            const originalBody =
                capturePaper.querySelector(
                    '#textInput'
                );


            const originalTitle =
                capturePaper.querySelector(
                    '#titleInput'
                );


            const originalAuthor =
                capturePaper.querySelector(
                    '#authorInput'
                );


            const originalFooter =
                capturePaper.querySelector(
                    '#footerInput'
                );


            /*
                html2canvas가 안정적으로
                텍스트를 캡처하도록
                입력 요소를 div로 변환합니다.
            */

            function makeCaptureText(
                original,
                type,
                value
            ) {

                const element =
                    document.createElement(
                        'div'
                    );


                element.className =
                    original.className
                        .replace(
                            'text-input',
                            ''
                        )
                        .replace(
                            'title-input',
                            ''
                        )
                        .replace(
                            'author-input',
                            ''
                        )
                        .replace(
                            'footer-input',
                            ''
                        );


                element.classList.add(
                    'capture-text'
                );


                element.classList.add(
                    type
                );


                const computed =
                    window.getComputedStyle(
                        original
                    );


                /*
                    현재 설정된 글자 크기를
                    그대로 가져옵니다.

                    예:
                    35px → 35px
                    40px → 40px
                    25px → 25px

                    저장용 paper가 1000px이므로
                    창 크기에 따라 변하지 않습니다.
                */

                element.style.fontSize =
                    computed.fontSize;


                element.style.lineHeight =
                    computed.lineHeight;


                element.style.fontWeight =
                    computed.fontWeight;


                element.style.textAlign =
                    computed.textAlign;


                element.style.fontFamily =
                    computed.fontFamily;


                element.style.color =
                    computed.color;


                element.style.width =
                    computed.width;


                element.style.whiteSpace =
                    'pre-wrap';


                element.style.overflowWrap =
                    'anywhere';


                element.style.wordBreak =
                    'break-all';


                element.textContent =
                    value || '';


                return element;

            }


            /* 본문 */

            const bodyCapture =
                makeCaptureText(
                    originalBody,
                    'body',
                    textInput.value
                );


            /* 제목 */

            const titleCapture =
                makeCaptureText(
                    originalTitle,
                    'title',
                    titleInput.value
                );


            /* 작가 */

            const authorCapture =
                makeCaptureText(
                    originalAuthor,
                    'author',
                    authorInput.value
                );


            /* 하단 */

            const footerCapture =
                makeCaptureText(
                    originalFooter,
                    'footer',
                    footerInput.value
                );


            /*
                기존 입력창을
                저장용 텍스트로 교체
            */

            originalBody.replaceWith(
                bodyCapture
            );


            originalTitle.replaceWith(
                titleCapture
            );


            originalAuthor.replaceWith(
                authorCapture
            );


            originalFooter.replaceWith(
                footerCapture
            );


            /*
                브라우저가
                저장용 1000 × 1000 레이아웃을
                다시 계산할 시간을 줍니다.
            */

            await new Promise(
                resolve => {

                    requestAnimationFrame(
                        () => {

                            requestAnimationFrame(
                                resolve
                            );

                        }
                    );

                }
            );


            /*
                이미지 생성

                width / height를
                paper.offsetWidth가 아니라
                고정값 EXPORT_SIZE로 지정합니다.
            */

            const canvas =
                await html2canvas(
                    capturePaper,
                    {

                        scale: 2,

                        useCORS: true,

                        backgroundColor:
                            state.background,

                        width:
                            EXPORT_SIZE,

                        height:
                            EXPORT_SIZE,

                        scrollX: 0,

                        scrollY: 0

                    }
                );


            /*
                PNG 저장
            */

            const link =
                document.createElement(
                    'a'
                );


            link.download =
                'my-epub-image.png';


            link.href =
                canvas.toDataURL(
                    'image/png'
                );


            link.click();


        } catch (error) {

            console.error(
                error
            );


            alert(
                '이미지 저장에 문제가 생겼습니다.'
            );


        } finally {

            if (capturePaper) {

                capturePaper.remove();

            }


            saveButton.disabled =
                false;


            saveButton.textContent =
                '이미지 저장';

        }

    }
);