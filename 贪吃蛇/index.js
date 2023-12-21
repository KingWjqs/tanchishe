// 将上一局游戏的分数打印
hisScore.innerHTML = localStorage.getItem('score');
// 获取蛇的容器
const snake = document.querySelector('#snake');

// 获取蛇的各个部位
const snakeBody = snake.getElementsByTagName('div');

// 获取食物
const food = document.querySelector('#food');

// 封装函数,随机食物出现的位置
function changeFood(r) {
    // 坐标为十的倍数
    let x = Math.floor(Math.random() * 30) * 10;
    let y = Math.floor(Math.random() * 30) * 10;
    let x1 = Math.floor(Math.random() * 30) * 10;
    let y1 = Math.floor(Math.random() * 30) * 10;
    // 设置食物的位置
    food.style.left = x + 'px';
    food.style.top = y + 'px';

    // 初始化时随机蛇的位置
    if (r === 1) {
        snakeBody[0].style.left = x1 + 'px';
        snakeBody[0].style.top = y1 + 'px';
    }
}
changeFood(1);
// 设置一个控制方向的变量
let direction;
//将事件放入数组,防止其它按键生效
const eArr = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

//创建一个对象,用于存放掉头的情况
const Xpalindrome = {
    ArrowUp: 'ArrowDown',
    ArrowDown: 'ArrowUp',
    ArrowLeft: 'ArrowRight',
    ArrowRight: 'ArrowLeft'
}
// 设置变量控制按键的设置
let keyF = true;
//键盘事件用于控制蛇的方向
document.addEventListener('keydown', e => {
    // 用键盘按下的按键判断方向,并且禁止连续按两下
    if (keyF && eArr.includes(e.key)) {
        // 判断是否掉头
        if (snakeBody.length < 2 || Xpalindrome[direction] !== e.key) {
            direction = e.key;
            keyF = false;
        }
    }
})

//设置初始的分数和等级
let scoref = 0;
let levelf = 0;

// 使用定时器控制速度,每隔一段时间判断方向
let time = setTimeout(move = () => {
    // 获取蛇头
    const snakeHead = snakeBody[0];
    // 将偏移量设置为变量
    let x = snakeHead.offsetLeft;
    let y = snakeHead.offsetTop;
    // 判断用户按下了哪个键
    switch (direction) {
        // 设置蛇下一个位置的偏移量
        case 'ArrowUp':
            y -= 10;
            break;

        case 'ArrowDown':
            y += 10;
            break;

        case 'ArrowLeft':
            x -= 10;
            break;

        case 'ArrowRight':
            x += 10;
            break;
    }
    // 判断蛇头是否和食物重叠
    if (snakeHead.offsetLeft === food.offsetLeft && snakeHead.offsetTop === food.offsetTop) {
        // 重和改变食物位置
        changeFood();
        // 蛇的长度加一
        snake.insertAdjacentElement('beforeend', document.createElement('div'));
        // 吃到食物后分数加一
        scoref++;
        score.innerHTML = scoref;
        // 吃五个等级加一
        if (scoref % 5 === 0 && levelf < 9) {
            levelf++;
            level.innerHTML = levelf;
        }
    }

    // 判断游戏是否终止
    if (x < 0 || x > stage.clientWidth || y < 0 || y > stage.clientHeight) {
        gameOver();
        return;
    }

    // 判断身体是否重叠,头尾不应该相撞
    for (let i = 0; i < snakeBody.length - 1; i++) {
        if (snakeBody[i].offsetLeft === x && snakeBody[i].offsetTop === y) {
            gameOver();
            return;
        }
    }
    // 获取蛇尾,将蛇尾设为蛇头
    const tail = snakeBody[snakeBody.length - 1];
    // 给蛇尾添加特殊类名
    const tailActive = document.querySelector('#snake .active');
    tailActive.classList.remove('active');
    tail.classList.add('active');

    // 将蛇尾放在蛇头的位置
    tail.style.left = x + 'px';
    tail.style.top = y + 'px';
    snake.insertAdjacentElement('afterbegin', tail);

    // 速度随着等级的变化而变化
    time = setTimeout(move, 300 - levelf * 30);

    // 重新开启按键设置
    keyF = true
}, 300);

function gameOver() {
    over.style.display = 'flex';
    // 将结束时的分数保存到本地
    localStorage.setItem('score', scoref);
}

// 游戏结束时询问重新开始
restart.onclick = function () {
    location.reload();
}