# ES6标准规范
## 声明约定

- 默认使用`const`进行声明；如果有重新赋值的需要，则使用`let`声明。避免使用`var`。 eslint: [`prefer-const`](http://eslint.org/docs/rules/prefer-const.html), [`no-const-assign`](http://eslint.org/docs/rules/no-const-assign.html)

  > Why? `const`确保你不会改变你的初始值，重复引用会导致bug和代码难以理解

  ```javascript
  // bad
  var a = 1;
  var b = 2;
  
  // good
  const a = 1;
  const b = 2;
  
  // bad
  var count = 1;
  if (true) {
    count += 1;
  }
  
  // good, use the let.
  let count = 1;
  if (true) {
    count += 1;
  }
  ```


## 块约定

- 用大括号包裹多行代码块。  eslint: [`nonblock-statement-body-position`](https://eslint.org/docs/rules/nonblock-statement-body-position)

  ```javascript
  // bad
  if (test)
    return false;
  
  // good
  if (test) {
    return false;
  }
  
  // bad
  function foo() { return false; }
  
  // good
  function bar() {
    return false;
  }
  ```

- `if`表达式的`else`和`if`的关闭大括号在一行。 eslint: [`brace-style`](http://eslint.org/docs/rules/brace-style.html)

  ```javascript
  // bad
  if (test) {
    thing1();
    thing2();
  }
  else {
    thing3();
  }
  
  // good
  if (test) {
    thing1();
    thing2();
  } else {
    thing3();
  }
  ```

- 如果 `if` 语句中总是需要用 `return` 返回， 那就不需要写 `else` 了。如果 `if` 块中包含 `return`， 它后面的 `else if` 块中也包含了 `return`， 这时可以把 `return` 分到多个 `if` 语句块中。 eslint: [`no-else-return`](https://eslint.org/docs/rules/no-else-return)

  ```javascript
  // bad
  function foo() {
    if (x) {
      return x;
    } else {
      return y;
    }
  }
  
  // bad
  function cats() {
    if (x) {
      return x;
    } else if (y) {
      return y;
    }
  }
  
  // bad
  function dogs() {
    if (x) {
      return x;
    } else {
      if (y) {
        return y;
      }
    }
  }
  
  // good
  function foo() {
    if (x) {
      return x;
    }
  
    return y;
  }
  
  // good
  function cats() {
    if (x) {
      return x;
    }
  
    if (y) {
      return y;
    }
  }
  
  // good
  function dogs(x) {
    if (x) {
      if (z) {
        return y;
      }
    } else {
      return z;
    }
  }
  ```



## 对象

- 使用字面值创建对象. eslint: [`no-new-object`](http://eslint.org/docs/rules/no-new-object.html)

  ```javascript
  // bad
  const item = new Object();
  
  // good
  const item = {};
  ```

- 当创建一个带有动态属性名的对象时，用计算后属性名

  > Why? 这可以使你将定义的所有属性放在对象的一个地方.

  ```javascript
  function getKey(k) {
    return `a key named ${k}`;
  }
  
  // bad
  const obj = {
    id: 5,
    name: 'San Francisco',
  };
  obj[getKey('enabled')] = true;
  
  // good getKey('enabled')是动态属性名
  const obj = {
    id: 5,
    name: 'San Francisco',
    [getKey('enabled')]: true,
  };
  ```

- 用对象方法简写. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

  ```javascript
  // bad
  const atom = {
    value: 1,
  
    addValue: function (value) {
      return atom.value + value;
    },
  };
  
  // good
  const atom = {
    value: 1,
  
    // 对象的方法
    addValue(value) {
      return atom.value + value;
    },
  };
  ```

- 用属性值缩写. eslint: [`object-shorthand`](http://eslint.org/docs/rules/object-shorthand.html)

  > Why? 这样写的更少且更可读

  ```javascript
  const lukeSkywalker = 'Luke Skywalker';
  
  // bad
  const obj = {
    lukeSkywalker: lukeSkywalker,
  };
  
  // good
  const obj = {
    lukeSkywalker,
  };
  ```

- 将你的所有缩写放在对象声明的开始.

  > Why? 这样也是为了更方便的知道有哪些属性用了缩写.

  ```javascript
  const anakinSkywalker = 'Anakin Skywalker';
  const lukeSkywalker = 'Luke Skywalker';
  
  // bad
  const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
  };
  
  // good
  const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
  };
  ```

- 只对那些无效的标示使用引号 `''`. eslint: [`quote-props`](http://eslint.org/docs/rules/quote-props.html)

  > Why? 通常我们认为这种方式主观上易读。他优化了代码高亮，并且页更容易被许多JS引擎压缩。

  ```javascript
  // bad
  const bad = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
  };
  
  // good
  const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
  };
  ```

- 不要直接调用`Object.prototype`上的方法，如`hasOwnProperty`, `propertyIsEnumerable`, `isPrototypeOf`。

  > Why? 在一些有问题的对象上， 这些方法可能会被屏蔽掉 - 如：`{ hasOwnProperty: false }` - 或这是一个空对象`Object.create(null)`

  ```javascript
  // bad
  console.log(object.hasOwnProperty(key));
  
  // good
  console.log(Object.prototype.hasOwnProperty.call(object, key));
  
  // best
  const has = Object.prototype.hasOwnProperty; // 在模块作用内做一次缓存
  /* or */
  import has from 'has'; // https://www.npmjs.com/package/has
  // ...
  console.log(has.call(object, key));
  ```

- 对象浅拷贝时，更推荐使用扩展运算符[就是`...`运算符]，而不是[`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)。获取对象指定的几个属性时，用对象的rest解构运算符[也是`...`运算符]更好。

  ```javascript
    // very bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign(original, { c: 3 }); // this mutates `original` ಠ_ಠ
    delete copy.a; // so does this
  
    // bad
    const original = { a: 1, b: 2 };
    const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
  
    // good es6扩展运算符 ...
    const original = { a: 1, b: 2 };
    // 浅拷贝
    const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
  
    // rest 赋值运算符
    const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
  ```

## 类

- 常用`class`，避免直接操作`prototype`

  > Why? `class`语法更简洁更易理解

  ```javascript
  // bad
  function Queue(contents = []) {
    this.queue = [...contents];
  }
  Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  };
  
  // good
  class Queue {
    constructor(contents = []) {
      this.queue = [...contents];
    }
    pop() {
      const value = this.queue[0];
      this.queue.splice(0, 1);
      return value;
    }
  }
  ```

- 用`extends`实现继承

  > Why? 它是一种内置的方法来继承原型功能而不打破`instanceof`

  ```javascript
  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function () {
    return this._queue[0];
  }
  
  // good
  class PeekableQueue extends Queue {
    peek() {
      return this._queue[0];
    }
  }
  ```

- 方法可以返回`this`来实现方法链

  ```javascript
  // bad
  Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
  };
  
  Jedi.prototype.setHeight = function (height) {
    this.height = height;
  };
  
  const luke = new Jedi();
  luke.jump(); // => true
  luke.setHeight(20); // => undefined
  
  // good
  class Jedi {
    jump() {
      this.jumping = true;
      return this;
    }
  
    setHeight(height) {
      this.height = height;
      return this;
    }
  }
  
  const luke = new Jedi();
  
  luke.jump()
    .setHeight(20);
  ```

- 写一个定制的`toString()`方法是可以的，只要保证它是可以正常工作且没有副作用的

  ```javascript
  class Jedi {
    constructor(options = {}) {
      this.name = options.name || 'no name';
    }
  
    getName() {
      return this.name;
    }
  
    toString() {
      return `Jedi - ${this.getName()}`;
    }
  }
  ```

- 如果没有具体说明，类有默认的构造方法。一个空的构造函数或只是代表父类的构造函数是不需要写的。 eslint: [`no-useless-constructor`](http://eslint.org/docs/rules/no-useless-constructor)

  ```javascript
  // bad
  class Jedi {
    constructor() {}
  
    getName() {
      return this.name;
    }
  }
  
  // bad
  class Rey extends Jedi {
    // 这种构造函数是不需要写的
    constructor(...args) {
      super(...args);
    }
  }
  
  // good
  class Rey extends Jedi {
    constructor(...args) {
      super(...args);
      this.name = 'Rey';
    }
  }
  ```

- 避免重复类成员。 eslint: [`no-dupe-class-members`](http://eslint.org/docs/rules/no-dupe-class-members)

  > Why? 重复类成员会默默的执行最后一个 —— 重复本身也是一个bug

  ```javascript
  // bad
  class Foo {
    bar() { return 1; }
    bar() { return 2; }
  }
  
  // good
  class Foo {
    bar() { return 1; }
  }
  
  // good
  class Foo {
    bar() { return 2; }
  }
  ```



## 数组

- 用字面量赋值。 eslint: [`no-array-constructor`](http://eslint.org/docs/rules/no-array-constructor.html)

  ```javascript
  // bad
  const items = new Array();
  
  // good
  const items = [];
  ```

- 用[Array#push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) 代替直接向数组中添加一个值。

  ```javascript
  const someStack = [];
  
  // bad
  someStack[someStack.length] = 'abracadabra';
  
  // good
  someStack.push('abracadabra');
  ```

- 用扩展运算符做数组浅拷贝，类似上面的对象浅拷贝

  ```javascript
  // bad
  const len = items.length;
  const itemsCopy = [];
  let i;
  
  for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
  }
  
  // good
  const itemsCopy = [...items];
  ```

- 用 `...` 运算符而不是[`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from)来将一个可迭代的对象转换成数组。

  ```javascript
  const foo = document.querySelectorAll('.foo');
  
  // good
  const nodes = Array.from(foo);
  
  // best
  const nodes = [...foo];
  ```

- 用 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 去将一个类数组对象转成一个数组。

  ```javascript
  const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
  
  // bad
  const arr = Array.prototype.slice.call(arrLike);
  
  // good
  const arr = Array.from(arrLike);
  ```

- 用 [`Array.from`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 而不是 `...` 运算符去做map遍历。 因为这样可以避免创建一个临时数组。

  ```javascript
  // bad
  const baz = [...foo].map(bar);
  
  // good
  const baz = Array.from(foo, bar);
  ```

- 在数组方法的回调函数中使用 return 语句。 如果函数体由一条返回一个表达式的语句组成， 并且这个表达式没有副作用， 这个时候可以忽略return。 eslint: [`array-callback-return`](http://eslint.org/docs/rules/array-callback-return)

  ```javascript
  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  
  // good 函数只有一个语句
  [1, 2, 3].map(x => x + 1);
  
  // bad - 没有返回值， 因为在第一次迭代后acc 就变成undefined了
  [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
    const flatten = acc.concat(item);
    acc[index] = flatten;
  });
  
  // good
  [[0, 1], [2, 3], [4, 5]].reduce((acc, item, index) => {
    const flatten = acc.concat(item);
    acc[index] = flatten;
    return flatten;
  });
  
  // bad
  inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    } else {
      return false;
    }
  });
  
  // good
  inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
      return author === 'Harper Lee';
    }
  
    return false;
  });
  ```

- 如果一个数组有很多行，在数组的 `[` 后和 `]` 前断行。 请看下面示例

  ```javascript
  // bad
  const arr = [
    [0, 1], [2, 3], [4, 5],
  ];
  
  const objectInArray = [{
    id: 1,
  }, {
    id: 2,
  }];
  
  const numberInArray = [
    1, 2,
  ];
  
  // good
  const arr = [
      [0, 1], 
      [2, 3], 
      [4, 5]
  ];
  
  const objectInArray = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];
  
  const numberInArray = [1, 2];
  ```



## 模块

- 用(`import`/`export`) 模块系统而不是非标准的模块系统。你可以随时用转译器转到你喜欢的模块系统。

  > Why? 模块化是未来，让我们现在就开启未来吧。

  ```javascript
  // bad
  const AirbnbStyleGuide = require('./AirbnbStyleGuide');
  module.exports = AirbnbStyleGuide.es6;

  // ok
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  export default AirbnbStyleGuide.es6;

  // best
  import es6 from './AirbnbStyleGuide';
  export default es6;
  ```

- 不要用import通配符， 就是 `*` 这种方式

  > Why? 这确保你有单个默认的导出

  ```javascript
  // bad
  import * as AirbnbStyleGuide from './AirbnbStyleGuide';

  // good
  import AirbnbStyleGuide from './AirbnbStyleGuide';
  ```

- 不要直接从import中直接export

  > Why? 虽然一行是简洁的，有一个明确的方式进口和一个明确的出口方式来保证一致性。

  ```javascript
  // bad
  // filename es6.js
  export { es6 as default } from './AirbnbStyleGuide';

  // good
  // filename es6.js
  import { es6 } from './AirbnbStyleGuide';
  export default es6;
  ```

- 一个路径只 import 一次。eslint: [`no-duplicate-imports`](http://eslint.org/docs/rules/no-duplicate-imports)
  > Why? 从同一个路径下import多行会使代码难以维护

  ```javascript
  // bad
  import foo from 'foo';
  // … some other imports … //
  import { named1, named2 } from 'foo';
  
  // good
  import foo, { named1, named2 } from 'foo';
  
  // good
  import foo, {
    named1,
    named2,
  } from 'foo';
  ```

- 不要导出可变的绑定。eslint: [`import/no-mutable-exports`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-mutable-exports.md)
  > Why? 变化通常都是需要避免，特别是当你要输出可变的绑定。虽然在某些场景下可能需要这种技术，但总的来说应该导出常量。

  ```javascript
  // bad
  let foo = 3;
  export { foo }
  
  // good
  const foo = 3;
  export { foo }
  ```

- 在一个单一导出模块里，用 `export default` 更好。eslint: [`import/prefer-default-export`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md)

  > Why? 鼓励使用更多文件，每个文件只做一件事情并导出，这样可读性和可维护性更好。

  ```javascript
  // bad
  export function foo() {}
  
  // good
  export default function foo() {}
  ```

- `import` 放在其他所有语句之前。eslint: [`import/first`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/first.md)

  > Why? 因为`import`会提升，让`import`放在最前面防止意外行为。

  ```javascript
  // bad
  import foo from 'foo';
  foo.init();
  
  import bar from 'bar';
  
  // good
  import foo from 'foo';
  import bar from 'bar';
  
  foo.init();
  ```

- 多行import应该缩进，就像多行数组和对象字面量。

  > Why?  花括号与样式指南中每个其他花括号块遵循相同的缩进规则，逗号也是。

  ```javascript
  // bad
  import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';

  // good
  import {
    longNameA,
    longNameB,
    longNameC,
    longNameD,
    longNameE,
  } from 'path';
  ```

- 在import语句里不允许Webpack loader语法。eslint: [`import/no-webpack-loader-syntax`](https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-webpack-loader-syntax.md)
  > Why? 一旦用Webpack语法在import里会把代码耦合到模块绑定器。最好是在`webpack.config.js`里写webpack loader语法

  ```javascript
  // bad
  import fooSass from 'css!sass!foo.scss';
  import barCss from 'style!css!bar.css';
  
  // good
  import fooSass from 'foo.scss';
  import barCss from 'bar.css';
  ```



## 字符串

- 对string用单引号 `''` 。 eslint: [`quotes`](https://eslint.org/docs/rules/quotes.html)

  ```javascript
  // bad
  const name = "Capt. Janeway";

  // bad - 样例应该包含插入文字或换行
  const name = `Capt. Janeway`;

  // good
  const name = 'Capt. Janeway';
  ```

- 超过100个字符的字符串不应该用string串联成多行。
  > Why? 被折断的字符串工作起来是糟糕的而且使得代码更不易被搜索。

  ```javascript
  // bad
  const errorMessage = 'This is a super long error that was thrown because \
  of Batman. When you stop to think about how Batman had anything to do \
  with this, you would get nowhere \
  fast.';

  // bad
  const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';

  // good
  const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
  ```

- 用字符串模板而不是字符串拼接来组织可编程字符串。 eslint: [`prefer-template`](https://eslint.org/docs/rules/prefer-template.html) [`template-curly-spacing`](https://eslint.org/docs/rules/template-curly-spacing)
  > why ? 模板字符串更具可读性、语法简洁、字符串插入参数。

  ```javascript
  // bad
  function sayHi(name) {
    return 'How are you, ' + name + '?';
  }

  // bad
  function sayHi(name) {
    return ['How are you, ', name, '?'].join();
  }

  // bad
  function sayHi(name) {
    return `How are you, ${ name }?`;
  }

  // good
  function sayHi(name) {
    return `How are you, ${name}?`;
  }
  ```

- 永远不要在字符串中用`eval()`，他就是潘多拉盒子。 eslint: [`no-eval`](https://eslint.org/docs/rules/no-eval)

- 不要使用不必要的转义字符。eslint: [`no-useless-escape`](http://eslint.org/docs/rules/no-useless-escape)

  >Why? 反斜线可读性差，所以他们只在必须使用时才出现哦

  ```javascript
  // bad
  const foo = '\'this\' \i\s \"quoted\"';

  // good
  const foo = '\'this\' is "quoted"';

  //best
  const foo = `my name is '${name}'`;
  ```


## 比较运算符
- 用 `===` 和 `!==` 而不是 `==` 和 `!=`.
 eslint: [`eqeqeq`](http://eslint.org/docs/rules/eqeqeq.html)
- 条件语句如'if'语句使用强制`ToBoolean'抽象方法来评估它们的表达式，并且始终遵循以下简单规则：

  + **Objects**   计算成 **true**
  + **Undefined** 计算成 **false**
  + **Null**      计算成 **false**
  + **Booleans**  计算成 **the value of the boolean**
  + **Numbers**
      + **+0, -0, or NaN** 计算成 **false**
      + 其他 **true**
  + **Strings**
      + `''` 计算成 **false**
      + 其他 **true**

  ```javascript
  if ([0] && []) {
      // true
      // 数组（即使是空数组）是对象，对象会计算成true
  }
  ```

- 布尔值用缩写，而字符串和数字要明确比较对象

  ```javascript
  // bad
  if (isValid === true) {
    // ...
  }

  // good
  if (isValid) {
    // ...
  }

  // bad
  if (name) {
    // ...
  }

  // good
  if (name !== '') {
    // ...
  }

  // bad
  if (collection.length) {
    // ...
  }

  // good
  if (collection.length > 0) {
    // ...
  }
  ```
- 更多信息请见Angus Croll的[真理、平等和JavaScript —— Truth Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/#more-2108)
- 在`case`和`default`分句里用大括号创建一块包含词法声明的区域(e.g. `let`, `const`, `function`, and `class`).
eslint rules: [`no-case-declarations`](http://eslint.org/docs/rules/no-case-declarations.html).

    > Why? 词法声明在整个`switch`的代码块里都可见，而初始化只有当这个`case`被执行时才发生。 当多个`case`分句试图定义同一个变量时就出问题了

    ```javascript
    // bad
    switch (foo) {
      case 1:
        let x = 1;
        break;
      case 2:
        const y = 2;
        break;
      case 3:
        function f() {
          // ...
        }
        break;
      default:
        class C {}
    }

    // good
    switch (foo) {
      case 1: {
        let x = 1;
        break;
      }
      case 2: {
        const y = 2;
        break;
      }
      case 3: {
        function f() {
          // ...
        }
        break;
      }
      case 4:
        bar();
        break;
      default: {
        class C {}
      }
    }
    ```

- 三元表达式不应该嵌套，通常是单行表达式。
eslint rules: [`no-nested-ternary`](http://eslint.org/docs/rules/no-nested-ternary.html).

  ```javascript
  // bad
  const foo = maybe1 > maybe2
    ? "bar"
    : value1 > value2 ? "baz" : null;

  // better
  const maybeNull = value1 > value2 ? 'baz' : null;

  const foo = maybe1 > maybe2
    ? 'bar'
    : maybeNull;

  // best
  const maybeNull = value1 > value2 ? 'baz' : null;

  const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
  ```

- 避免不需要的三元表达式

  eslint rules: [`no-unneeded-ternary`](http://eslint.org/docs/rules/no-unneeded-ternary.html).

  ```javascript
  // bad
  const foo = a ? a : b;
  const bar = c ? true : false;
  const baz = c ? false : true;

  // good
  const foo = a || b;
  const bar = !!c;
  const baz = !c;
  ```

- 用圆括号来混合这些操作符。 只有当标准的算术运算符(`+`, `-`, `*`, & `/`)， 并且它们的优先级显而易见时，可以不用圆括号括起来。 eslint: [`no-mixed-operators`](https://eslint.org/docs/rules/no-mixed-operators.html)

  > Why? 这提高了可读性，并且明确了开发者的意图

  ```javascript
  // bad
  const foo = a && b < 0 || c > 0 || d + 1 === 0;

  // bad
  const bar = a ** b - 5 % d;

  // bad
  // 别人会陷入(a || b) && c 的迷惑中
  if (a || b && c) {
    return d;
  }

  // good
  const foo = (a && b < 0) || c > 0 || (d + 1 === 0);

  // good
  const bar = (a ** b) - (5 % d);

  // good
  if (a || (b && c)) {
    return d;
  }

  // good
  const bar = a + (b / c * d);
  ```

## 命名规范

- 避免用一个字母命名，让你的命名可描述。 eslint: [`id-length`](http://eslint.org/docs/rules/id-length)

  ```js
    // bad
    function q() {
      // ...
    }
  
    // good
    function query() {
      // ...
    }
  ```
- 使用有意义并且可读的变量名称

  ```javascript
  // bad
  const yyyymmdstr = moment().format('YYYY/MM/DD');
  
  // good
  const currentDate = moment().format('YYYY/MM/DD');
  ```

- 为相同类型的变量使用相同的词汇

    ```javascript
    // bad
    getUserInfo();
    getClientData();
    getCustomerRecord();
    
    // good
    getUser();
    ```

- 使用可搜索的名称

    ```javascript
    // bad
    setTimeout(blastOff, 86400000);
    
    // good
    const MILLISECONDS_IN_A_DAY = 86400000;
    setTimeout(blastOff, MILLISECONDS_IN_A_DAY);
    ```

- 使用解释性的变量名

    ```javascript
    // bad
    const address = 'One Infinite Loop, Cupertino 95014';
    const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
    saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
    
    // good
    const address = 'One Infinite Loop, Cupertino 95014';
    const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
    const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
    saveCityZipCode(city, zipCode);
    ```

- 避免抽象映射

    ```javascript
    // bad
    const locations = ['Austin', 'New York', 'San Francisco'];
    locations.forEach((l) => {
      doStuff();
      doSomeOtherStuff();
      // ...
      // ...
      // ...
      // 等等， `l` 是啥？
      dispatch(l);
    });
    
    // good
    const locations = ['Austin', 'New York', 'San Francisco'];
    locations.forEach((location) => {
      doStuff();
      doSomeOtherStuff();
      // ...
      // ...
      // ...
      dispatch(location);
    });
    ```

- 不添加不必要的上下文

    ```javascript
    // bad
    const Car = {
      carMake: 'Honda',
      carModel: 'Accord',
      carColor: 'Blue'
    };
    
    function paintCar(car) {
      car.carColor = 'Red';
    }
    
    // good
    const Car = {
      make: 'Honda',
      model: 'Accord',
      color: 'Blue'
    };
    
    function paintCar(car) {
      car.color = 'Red';
    }
    ```

- 用小驼峰式命名你的对象、函数、实例。 eslint: [`camelcase`](http://eslint.org/docs/rules/camelcase.html)

  ```javascript
  // bad
  const OBJEcttsssss = {};
  const this_is_my_object = {};
  function c() {}
  
  // good
  const thisIsMyObject = {};
  function thisIsMyFunction() {}// zhenchang liangdaxie
  ```

- 用大驼峰式命名类。 eslint: [`new-cap`](http://eslint.org/docs/rules/new-cap.html)

  ```javascript
  // bad
  function user(options) {
    this.name = options.name;
  }
  
  const bad = new user({
    name: 'nope',
  });
  
  // good
  class User {
    constructor(options) {
      this.name = options.name;
    }
  }
  
  const good = new User({
    name: 'yup',
  });
  ```

- 不要用前置或后置下划线。 eslint: [`no-underscore-dangle`](http://eslint.org/docs/rules/no-underscore-dangle.html)

  > Why? JavaScript 没有私有属性或私有方法的概念。尽管前置下划线通常的概念上意味着“private”，事实上，这些属性是完全公有的，因此这部分也是你的API的内容。这一概念可能会导致开发者误以为更改这个不会导致崩溃或者不需要测试。 如果你想要什么东西变成“private”，那就不要让它在这里出现。

  ```javascript
  // bad
  this.__firstName__ = 'Panda';
  this.firstName_ = 'Panda';
  this._firstName = 'Panda';
  
  // good
  this.firstName = 'Panda';
  
  // good, in environments where WeakMaps are available
  // see https://kangax.github.io/compat-table/es6/#test-WeakMap
  const firstNames = new WeakMap();
  firstNames.set(this, 'Panda');
  ```

- 文件名称应该跟它的默认导出的名称一致

  ```javascript
  // file 1 contents
  class CheckBox {
    // ...
  }
  export default CheckBox;
  
  // file 2 contents
  export default function fortyTwo() { return 42; }
  
  // file 3 contents
  export default function insideDirectory() {}
  
  // in some other file
  // bad
  import CheckBox from './checkBox'; // PascalCase import/export, camelCase filename
  import FortyTwo from './FortyTwo'; // PascalCase import/filename, camelCase export
  import InsideDirectory from './InsideDirectory'; // PascalCase import/filename, camelCase export
  
  // bad
  import CheckBox from './check_box'; // PascalCase import/export, snake_case filename
  import forty_two from './forty_two'; // snake_case import/filename, camelCase export
  import inside_directory from './inside_directory'; // snake_case import, camelCase export
  import index from './inside_directory/index'; // requiring the index file explicitly
  import insideDirectory from './insideDirectory/index'; // requiring the index file explicitly
  
  // good
  import CheckBox from './CheckBox'; // PascalCase export/import/filename
  import fortyTwo from './fortyTwo'; // camelCase export/import/filename
  import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
  // ^ supports both insideDirectory.js and insideDirectory/index.js
  ```

- 当默认导出是函数时，函数名用小驼峰，文件名需要和函数名一致。

  ```javascript
  function makeStyleGuide() {
    // ...
  }
  
  export default makeStyleGuide;
  ```

- 当你export一个构造函数/类/单例/函数库/空对象时用大驼峰。

  ```javascript
  const AirbnbStyleGuide = {
    es6: {
    }
  };
  
  export default AirbnbStyleGuide;
  ```

- 首字符缩略词和缩写应该全部大写或小写

  > Why? 名字都是给人读的，不是为了适应电脑的算法的。

  ```javascript
  // bad
  import SmsContainer from './containers/SmsContainer';
  
  // bad
  const HttpRequests = [
    // ...
  ];
  
  // good
  import SMSContainer from './containers/SMSContainer';
  
  // good
  const HTTPRequests = [
    // ...
  ];
  
  // also good
  const httpRequests = [
    // ...
  ];
  
  // best
  import TextMessageContainer from './containers/TextMessageContainer';
  
  // best
  const requests = [
    // ...
  ];
  ```

- 你可以用全大写字母设置常量，他需要满足三个条件。
    1. 是导出的(is exported)
    1. 是 `const` 定义的， 保证不能被改变
    1. 这个变量是可信的，他的子属性都是不能被改变的

    > Why? UPPERCASE_VARIABLES告诉开发者该变量是可信任的并且不会改变的
    - 对于所有的 `const` 变量呢？ —— 这个是不必要的。大写变量不应该在同一个文件里定义并使用， 它只能用来作为导出变量。 赞同！
    - 那导出的对象呢？ —— 大写变量处在export的最高级(e.g. `EXPORTED_OBJECT.key`) 并且他包含的所有子属性都是不可变的。

    ```javascript
    // bad
    const PRIVATE_VARIABLE = 'should not be unnecessarily uppercased within a file';
    
    // bad
    export const THING_TO_BE_CHANGED = 'should obviously not be uppercased';
    
    // bad
    export let REASSIGNABLE_VARIABLE = 'do not use let with uppercase variables';
    
    // ---
    
    // allowed but does not supply semantic value
    export const apiKey = 'SOMEKEY';
    
    // better in most cases
    export const API_KEY = 'SOMEKEY';
    
    // ---
    
    // bad - unnecessarily uppercases key while adding no semantic value
    export const MAPPING = {
      KEY: 'value'
    };
    
    // good
    export const MAPPING = {
      key: 'value'
    };
    ```

## 代码格式


### 控制语句

- 当你的控制语句(`if`, `while` 等)太长或者超过最大长度限制的时候， 把每一个(组)判断条件放在单独一行里。 逻辑操作符放在行首。

  > Why? 把逻辑操作符放在行首是让操作符的对齐方式和链式函数保持一致。这提高了可读性，也让复杂逻辑更容易看清楚。

  ```javascript
  // bad
  if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    thing1();
  }

  // bad
  if (foo === 123 &&
    bar === 'abc') {
    thing1();
  }

  // bad
  if (foo === 123
    && bar === 'abc') {
    thing1();
  }

  // bad
  if (
    foo === 123 &&
    bar === 'abc'
  ) {
    thing1();
  }

  // good
  if (
    foo === 123
    && bar === 'abc'
  ) {
    thing1();
  }

  // good
  if (
    (foo === 123 || bar === 'abc')
    && doesItLookGoodWhenItBecomesThatLong()
    && isThisReallyHappening()
  ) {
    thing1();
  }

  // good
  if (foo === 123 && bar === 'abc') {
    thing1();
  }
  ```

- 不要用选择操作符代替控制语句。

  ```javascript
  // bad
  !isRunning && startRunning();

  // good
  if (!isRunning) {
    startRunning();
  }
  ```



### 注释
- 多行注释用 `/** ... */`

  ```javascript
  // bad
  // make() returns a new element
  // based on the passed in tag name
  //
  // @param {String} tag
  // @return {Element} element
  function make(tag) {
  
    // ...
  
    return element;
  }
  
  // good
  /**
    * make() returns a new element
    * based on the passed-in tag name
    */
  function make(tag) {
  
    // ...
  
    return element;
  }
  ```

- 单行注释用`//`，将单行注释放在被注释区域上面。如果注释不是在第一行，那么注释前面就空一行

  ```javascript
  // bad
  const active = true;  // is current tab
  
  // good
  // is current tab
  const active = true;
  
  // bad
  function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this._type || 'no type';
  
    return type;
  }
  
  // good
  function getType() {
    console.log('fetching type...');
  
    // set the default type to 'no type'
    const type = this._type || 'no type';
  
    return type;
  }
  
  // also good
  function getType() {
    // set the default type to 'no type'
    const type = this._type || 'no type';
  
    return type;
  }
  ```

- 所有注释开头保留一个空格，方便阅读。 eslint: [`spaced-comment`](http://eslint.org/docs/rules/spaced-comment)

  ```javascript
  // bad
  //is current tab
  const active = true;
  
  // good
  // is current tab
  const active = true;
  
  // bad
  /**
    *make() returns a new element
    *based on the passed-in tag name
    */
  function make(tag) {
  
    // ...
  
    return element;
  }
  
  // good
  /**
    * make() returns a new element
    * based on the passed-in tag name
    */
  function make(tag) {
  
    // ...
  
    return element;
  }
  ```

- 在你的注释前使用`FIXME'或`TODO'前缀， 这有助于其他开发人员快速理解你指出的需要重新访问的问题， 或者您建议需要实现的问题的解决方案。 这些不同于常规注释，因为它们是可操作的。 动作是`FIXME： - 需要计算出来`或`TODO： - 需要实现`。

- 用`// FIXME:`给问题做注释

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();
  
      // FIXME: shouldn't use a global here
      total = 0;
    }
  }
  ```

- 用`// TODO:`去注释问题的解决方案

  ```javascript
  class Calculator extends Abacus {
    constructor() {
      super();
  
      // TODO: total should be configurable by an options param
      this.total = 0;
    }
  }
  ```

- 评论是代码的辩解， 不是要求。 多数情况下， 好的代码就是文档

  ```javascript
  // bad 
  function hashIt(data) {
    // The hash
    let hash = 0;
  
    // Length of string
    const length = data.length;
  
    // Loop through every character in data
    for (let i = 0; i < length; i++) {
      // Get character code.
      const char = data.charCodeAt(i);
      // Make the hash
      hash = ((hash << 5) - hash) + char;
      // Convert to 32-bit integer
      hash &= hash;
    }
  }
  
  // good
  function hashIt(data) {
    let hash = 0;
    const length = data.length;
  
    for (let i = 0; i < length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
  
      // Convert to 32-bit integer
      hash &= hash;
    }
  }
  ```

- 不要在代码库中保存注释掉的代码，因为有版本控制， 把旧的代码留在历史记录即可。

  ```javascript
  // bad
  doStuff();
  // doOtherStuff();
  // doSomeMoreStuff();
  // doSoMuchStuff();
  
  // good
  doStuff();
  ```

- 不要有日志式的评论。使用版本控制！ 不需要僵尸代码， 注释调的代码， 尤其是日志式的评论。 使用 `git log` 来获取历史记录。

  ```javascript
  // bad
  /**
   * 2016-12-20: Removed monads, didn't understand them (RM)
   * 2016-10-01: Improved using special monads (JP)
   * 2016-02-03: Removed type-checking (LI)
   * 2015-03-14: Added combine with type-checking (JR)
   */
  function combine(a, b) {
    return a + b;
  }
  
  // good
  function combine(a, b) {
    return a + b;
  }
  ```

- 避免占位符

  ```javascript
  // bad
  ////////////////////////////////////////////////////////////////////////////////
  // Scope Model Instantiation
  ////////////////////////////////////////////////////////////////////////////////
  $scope.model = {
    menu: 'foo',
    nav: 'bar'
  };
  
  ////////////////////////////////////////////////////////////////////////////////
  // Action setup
  ////////////////////////////////////////////////////////////////////////////////
  const actions = function() {
    // ...
  };
  
  
  // good
  $scope.model = {
    menu: 'foo',
    nav: 'bar'
  };
  
  const actions = function() {
    // ...
  };
  ```



### 空格

- tab可选用两个或四个空格，但在同一项目中要一致。 eslint: [`indent`](http://eslint.org/docs/rules/indent.html)

  ```javascript
  // bad
  function bar() {
  ∙const name;
  }
  
  // bad
  function foo() {
  ∙∙∙∙const name;
  }
  function foa() {
  ∙∙const name;
  }
  
  // good
  function baz() {
  ∙∙const name;
  }
  
  // good
  function foo() {
  ∙∙∙∙const name;
  }
  function foa() {
  ∙∙∙∙const name;
  }
  ```

- 在大括号前空一格。 eslint: [`space-before-blocks`](http://eslint.org/docs/rules/space-before-blocks.html)

  ```javascript
  // bad
  function test(){
    console.log('test');
  }

  // good
  function test() {
    console.log('test');
  }

  // bad
  dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });

  // good
  dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
  });
  ```

- 在控制语句(`if`, `while` 等)的圆括号前空一格。在函数调用和定义时，参数列表和函数名之间不空格。 eslint: [`keyword-spacing`](http://eslint.org/docs/rules/keyword-spacing.html)

  ```javascript
  // bad
  if(isJedi) {
    fight ();
  }

  // good
  if (isJedi) {
    fight();
  }

  // bad
  function fight () {
    console.log ('Swooosh!');
  }

  // good
  function fight() {
    console.log('Swooosh!');
  }
  ```

- 用空格来隔开运算符。 eslint: [`space-infix-ops`](http://eslint.org/docs/rules/space-infix-ops.html)

  ```javascript
  // bad
  const x=y+5;

  // good
  const x = y + 5;
  ```

- 文件结尾空一行. eslint: [`eol-last`](https://github.com/eslint/eslint/blob/master/docs/rules/eol-last.md)

  ```javascript
  // bad
  import { es6 } from './AirbnbStyleGuide';
    // ...
  export default es6;
  ```

  ```javascript
  // bad
  import { es6 } from './AirbnbStyleGuide';
    // ...
  export default es6;
  ↵
  ↵
  ```

  ```javascript
  // good
  import { es6 } from './AirbnbStyleGuide';
    // ...
  export default es6;
  ↵
  ```

- 当出现长的方法链（>2个）时用缩进。用点开头强调该行是一个方法调用，而不是一个新的语句。eslint: [`newline-per-chained-call`](http://eslint.org/docs/rules/newline-per-chained-call) [`no-whitespace-before-property`](http://eslint.org/docs/rules/no-whitespace-before-property)

  ```javascript
  // bad
  $('#items').find('.selected').highlight().end().find('.open').updateCount();

  // bad
  $('#items').
    find('.selected').
      highlight().
      end().
    find('.open').
      updateCount();

  // good
  $('#items')
    .find('.selected')
      .highlight()
      .end()
    .find('.open')
      .updateCount();

  // bad
  const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
      .attr('width', (radius + margin) * 2).append('svg:g')
      .attr('transform', `translate(${radius + margin},${radius + margin})`)
      .call(tron.led);

  // good
  const leds = stage.selectAll('.led')
      .data(data)
    .enter().append('svg:svg')
      .classed('led', true)
      .attr('width', (radius + margin) * 2)
    .append('svg:g')
      .attr('transform', `translate(${radius + margin},${radius + margin})`)
      .call(tron.led);

  // good
  const leds = stage.selectAll('.led').data(data);
  ```

- 在一个代码块后下一条语句前空一行。

  ```javascript
  // bad
  if (foo) {
    return bar;
  }
  return baz;

  // good
  if (foo) {
    return bar;
  }

  return baz;

  // bad
  const obj = {
    foo() {
    },
    bar() {
    },
  };
  return obj;

  // good
  const obj = {
    foo() {
    },

    bar() {
    },
  };

  return obj;

  // bad
  const arr = [
    function foo() {
    },
    function bar() {
    },
  ];
  return arr;

  // good
  const arr = [
    function foo() {
    },

    function bar() {
    },
  ];

  return arr;
  ```

- 不要用空白行填充块。 eslint: [`padded-blocks`](http://eslint.org/docs/rules/padded-blocks.html)

  ```javascript
  // bad
  function bar() {

    console.log(foo);

  }

  // also bad
  if (baz) {

    console.log(qux);
  } else {
    console.log(foo);

  }

  // good
  function bar() {
    console.log(foo);
  }

  // good
  if (baz) {
    console.log(qux);
  } else {
    console.log(foo);
  }
  ```

- 圆括号里不要加空格。 eslint: [`space-in-parens`](http://eslint.org/docs/rules/space-in-parens.html)

  ```javascript
  // bad
  function bar( foo ) {
    return foo;
  }

  // good
  function bar(foo) {
    return foo;
  }

  // bad
  if ( foo ) {
    console.log(foo);
  }

  // good
  if (foo) {
    console.log(foo);
  }
  ```

- 方括号里不要加空格。看示例。 eslint: [`array-bracket-spacing`](http://eslint.org/docs/rules/array-bracket-spacing.html)

  ```javascript
  // bad
  const foo = [ 1, 2, 3 ];
  console.log(foo[ 0 ]);

  // good， 逗号分隔符还是要空格的
  const foo = [1, 2, 3];
  console.log(foo[0]);
  ```

- 花括号里加空格。 eslint: [`object-curly-spacing`](http://eslint.org/docs/rules/object-curly-spacing.html)

  ```javascript
  // bad
  const foo = {clark: 'kent'};

  // good
  const foo = { clark: 'kent' };
  ```

- 避免一行代码超过100个字符（包含空格）。注意： 长字符串不受此规则限制，不应分解。 eslint: [`max-len`](http://eslint.org/docs/rules/max-len.html)

  > Why? 这样确保可读性和可维护性

  ```javascript
  // bad
  const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;

  // bad
  $.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));

  // good
  const foo = jsonData
    && jsonData.foo
    && jsonData.foo.bar
    && jsonData.foo.bar.baz
    && jsonData.foo.bar.baz.quux
    && jsonData.foo.bar.baz.quux.xyzzy;

  // good
  $.ajax({
    method: 'POST',
    url: 'https://airbnb.com/',
    data: { name: 'John' },
  })
    .done(() => console.log('Congratulations!'))
    .fail(() => console.log('You have failed this city.'));
  ```

- 作为语句的花括号内也要加空格 —— `{` 后和 `}` 前都需要空格。 eslint: [`block-spacing`](https://eslint.org/docs/rules/block-spacing)

  ```javascript
  // bad
  function foo() {return true;}
  if (foo) { bar = 0;}

  // good
  function foo() { return true; }
  if (foo) { bar = 0; }
  ```

- `,` 前不要空格， `,` 后需要空格。 eslint: [`comma-spacing`](https://eslint.org/docs/rules/comma-spacing)

  ```javascript
  // bad
  var foo = 1,bar = 2;
  var arr = [1 , 2];

  // good
  var foo = 1, bar = 2;
  var arr = [1, 2];
  ```

- 强制计算属性不要空格。参考上面的中括号规则。 eslint: [`computed-property-spacing`](https://eslint.org/docs/rules/computed-property-spacing)

  ```javascript
  // bad
  obj[foo ]
  obj[ 'foo']
  var x = {[ b ]: a}
  obj[foo[ bar ]]

  // good
  obj[foo]
  obj['foo']
  var x = { [b]: a }
  obj[foo[bar]]
  ```

- 调用函数时，函数名和小括号之间不要空格。 eslint: [`func-call-spacing`](https://eslint.org/docs/rules/func-call-spacing)

  ```javascript
  // bad
  func ();

  func
  ();

  // good
  func();
  ```

- 在对象的字面量属性中， `key` `value` 之间要有空格。 eslint: [`key-spacing`](https://eslint.org/docs/rules/key-spacing)

  ```javascript
  // bad
  var obj = { "foo" : 42 };
  var obj2 = { "foo":42 };

  // good
  var obj = { "foo": 42 };
  ```

- 行末不要空格。 eslint: [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

- 避免出现多个空行。 在文件末尾只允许空一行。 eslint: [`no-multiple-empty-lines`](https://eslint.org/docs/rules/no-multiple-empty-lines)

  ```javascript
  // bad
  var x = 1;
  
  
  
  var y = 2;
  
  // good
  var x = 1;
  
  var y = 2;
  ```



### 逗号

- 不要前置逗号。 eslint: [`comma-style`](http://eslint.org/docs/rules/comma-style.html)

  ```javascript
  // bad
  const story = [
      once
    , upon
    , aTime
  ];
  
  // good
  const story = [
    once,
    upon,
    aTime,
  ];
  
  // bad
  const hero = {
      firstName: 'Ada'
    , lastName: 'Lovelace'
    , birthYear: 1815
    , superPower: 'computers'
  };
  
  // good
  const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
  };
  ```

- 额外结尾逗号。 eslint: [`comma-dangle`](http://eslint.org/docs/rules/comma-dangle.html) 

  > Why? 这导致git diffs更清洁。 此外，像Babel这样的转换器会删除转换代码中的额外的逗号，这意味着你不必担心旧版浏览器中的[结尾逗号问题](https://github.com/airbnb/javascript/blob/es5-deprecated/es5/README.md#commas)。

  ```diff
  // bad - 没有结尾逗号的 git diff
  const hero = {
        firstName: 'Florence',
  -    lastName: 'Nightingale'
  +    lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing']
  };
  
  // good - 有结尾逗号的 git diff
  const hero = {
        firstName: 'Florence',
        lastName: 'Nightingale',
  +    inventorOf: ['coxcomb chart', 'modern nursing'],
  };
  ```

  ```javascript
    // bad
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully'
    };
  
    const heroes = [
      'Batman',
      'Superman'
    ];
  
    // good
    const hero = {
      firstName: 'Dana',
      lastName: 'Scully',
    };
  
    const heroes = [
      'Batman',
      'Superman',
    ];
  
    // bad
    function createHero(
      firstName,
      lastName,
      inventorOf
    ) {
      // does nothing
    }
  
    // good
    function createHero(
      firstName,
      lastName,
      inventorOf,
    ) {
      // does nothing
    }
    // good (note that a comma must not appear after a "rest" element)
    function createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    ) {
      // does nothing
    }
  
    // bad
    createHero(
      firstName,
      lastName,
      inventorOf
    );
  
    // good
    createHero(
      firstName,
      lastName,
      inventorOf,
    );
  
    // good (note that a comma must not appear after a "rest" element)
    createHero(
      firstName,
      lastName,
      inventorOf,
      ...heroArgs
    )
  ```



### 分号

- **Yup.** eslint: [`semi`](http://eslint.org/docs/rules/semi.html)

  > Why? 当 JavaScript 遇到没有分号结尾的一行，它会执行[自动插入分号 `Automatic Semicolon Insertion`](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)这一规则来决定行末是否加分号。如果JavaScript在你的断行里错误的插入了分号，就会出现一些古怪的行为。当新的功能加到JavaScript里后， 这些规则会变得更复杂难懂。显示的结束语句，并通过配置代码检查去捕获没有带分号的地方可以帮助你防止这种错误。

  ```javascript
  // bad
  (function () {
    const name = 'Skywalker'
    return name
  })()

  // good
  (function () {
    const name = 'Skywalker';
    return name;
  }());

  // good, 行首加分号，避免文件被连接到一起时立即执行函数被当做变量来执行。
  ;(() => {
    const name = 'Skywalker';
    return name;
  }());
  ```

  [Read more](https://stackoverflow.com/questions/7365172/semicolon-before-self-invoking-function/7365214%237365214).



## 箭头函数

- 当你必须要用匿名函数（比如当传递一个回调函数时）的时候就用箭头表达式吧。 eslint: [`prefer-arrow-callback`](http://eslint.org/docs/rules/prefer-arrow-callback.html), [`arrow-spacing`](http://eslint.org/docs/rules/arrow-spacing.html)

  > Why? 他创建了一个`this`的当前执行上下文的函数的版本，这通常就是你想要的；而且箭头函数是更简洁的语法

  ```javascript
    // bad
    [1, 2, 3].map(function (x) {
      const y = x + 1;
      return x * y;
    });
  
    // good
    [1, 2, 3].map((x) => {
      const y = x + 1;
      return x * y;
    });
  ```

- 如果函数体由一个没有副作用的[表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)语句组成，删除大括号和return。否则，继续用大括号和 `return` 语句。 eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html), [`arrow-body-style`](https://eslint.org/docs/rules/arrow-body-style.html)

  ```javascript
  // bad
  [1, 2, 3].map(number => {
    const nextNumber = number + 1;
    `A string containing the ${nextNumber}.`;
  });
  
  // good
  [1, 2, 3].map(number => `A string containing the ${number}.`);
  
  // good
  [1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
  });
  
  // good
  [1, 2, 3].map((number, index) => ({
    [index]: number
  }));
  
  // 表达式有副作用就不要用隐式return
  function foo(callback) {
    const val = callback();
    if (val === true) {
      // Do something if callback returns true
    }
  }
  
  let bool = false;
  
  // bad
  // 这种情况会return bool = true, 不好
  foo(() => bool = true);
  
  // good
  foo(() => {
    bool = true;
  });
  ```

- 万一表达式涉及多行，把他包裹在圆括号里更可读。

  > Why? 这样清晰的显示函数的开始和结束

  ```js
  // bad
  ['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod
    )
  );
  
  // good
  ['get', 'post', 'put'].map(httpMethod => (
    Object.prototype.hasOwnProperty.call(
      httpMagicObjectWithAVeryLongName,
      httpMethod
    )
  ));
  ```

- 如果你的函数只有一个参数并且函数体没有大括号，就删除圆括号。否则，参数总是放在圆括号里。 注意： 一直用圆括号也是没问题，只需要配置 [“always” option](https://eslint.org/docs/rules/arrow-parens#always) for eslint. eslint: [`arrow-parens`](https://eslint.org/docs/rules/arrow-parens.html)

  > Why? 这样少一些混乱， 其实没啥语法上的讲究，就保持一个风格。

  ```js
  // bad
  [1, 2, 3].map((x) => x * x);
  
  // good
  [1, 2, 3].map(x => x * x);
  
  // good
  [1, 2, 3].map(number => (
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
  ));
  
  // bad
  [1, 2, 3].map(x => {
    const y = x + 1;
    return x * y;
  });
  
  // good
  [1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
  });
  ```

- 避免箭头函数(`=>`)和比较操作符（`<=, >=`）混淆. eslint: [`no-confusing-arrow`](http://eslint.org/docs/rules/no-confusing-arrow)

  ```js
  // bad
  const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;
  
  // bad
  const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;
  
  // good
  const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);
  
  // good
  const itemHeight = (item) => {
    const { height, largeSize, smallSize } = item;
    return height > 256 ? largeSize : smallSize;
  };
  ```

- 在隐式return中强制约束函数体的位置， 就写在箭头后面。 eslint: [`implicit-arrow-linebreak`](https://eslint.org/docs/rules/implicit-arrow-linebreak)

  ```javascript
  // bad
  (foo) =>
    bar;
  
  (foo) =>
    (bar);
  
  // good
  (foo) => bar;
  (foo) => (bar);
  (foo) => (
      bar
  )
  ```

## Rest

- 不要使用`arguments`，用rest语法`...`代替。 eslint: [`prefer-rest-params`](http://eslint.org/docs/rules/prefer-rest-params)

  > Why? `...`明确你想用那个参数。而且rest参数是真数组，而不是类似数组的`arguments`

  ```javascript
  // bad
  function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
  }
  
  // good
  function concatenateAll(...args) {
    return args.join('');
  }
  ```

## 默认参数

- 使用默认参数替代短路运算或条件

  ```javascript
  // bad
  function createMicrobrewery(name) {
    const breweryName = name || 'Hipster Brew Co.';
    // ...
  }
  
  // good
  function createMicrobrewery(breweryName = 'Hipster Brew Co.') {
    // ...
  }
  ```

- 默认参数避免副作用

  > Why? 他会令人迷惑不解， 比如下面这个， a到底等于几， 这个需要想一下。

  ```javascript
  var b = 1;
  // bad
  function count(a = b++) {
    console.log(a);
  }
  count();  // 1
  count();  // 2
  count(3); // 3
  count();  // 3
  ```

- 把默认参数赋值放在最后

  ```javascript
  // bad
  function handleThings(opts = {}, name) {
    // ...
  }
  
  // good
  function handleThings(name, opts = {}) {
    // ...
  }
  ```

## 解构赋值

- 用对象的解构赋值来获取和使用对象某个或多个属性值。 eslint: [`prefer-destructuring`](https://eslint.org/docs/rules/prefer-destructuring)

  > Why? 解构保存了这些属性的临时值/引用

  ```javascript
  // bad
  function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
  
    return `${firstName} ${lastName}`;
  }
  
  // good
  function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }
  
  // best
  function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  }
  ```

- 使用数组解构.

  ```javascript
  const arr = [1, 2, 3, 4];
  
  // bad
  const first = arr[0];
  const second = arr[1];
  
  // good
  const [first, second] = arr;
  ```

- 当函数有多个返回值时使用对象解构，而不是数组解构。

  > Why? 你可以在后期添加新的属性或者变换变量的顺序而不会打破原有的调用

  ```javascript
  // bad
  function processInput(input) {
    // 然后就是见证奇迹的时刻
    return [left, right, top, bottom];
  }
  
  // 调用者需要想一想返回值的顺序
  const [left, __, top] = processInput(input);
  
  // good
  function processInput(input) {
    // oops， 奇迹又发生了
    return { left, right, top, bottom };
  }
  
  // 调用者只需要选择他想用的值就好了
  const { left, top } = processInput(input);
  ```

- 交换变量的值

  ```js
  // old
  function swap(arr, i, j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  
  // now with de-structuring
  function swap(arr, i, j){
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  ```

## 异步

- 当异步操作无依赖关系时，并发多个异步操作

  ```js
  let promiseA = function (reslove, reject) {
    return new Promise(reslove => {
      setTimeout(function() {
        reslove('A')
      }, 1000)
    })
  }
  let promiseB = function (reslove, reject) {
    return new Promise(reslove => {
      setTimeout(function() {
        reslove('B')
      }, 1000)
    })
  }
  
  // bad
  let sequential = async function() {
    await promiseA()
    await promiseB()
  }
  
  // Good
  let concurrent1 = async function() {
    let pA = promiseA()
    let pB = promiseB()
  
    await pA
    await pB
  }
  
  // Good
  let concurrent2 = async function() {
    Primise.all([promiseA(), promiseB()]).then()
  }
  ```

## Map/Set

- Map的key支持多种数据类型，而Object只支持数字/字符串/Symbol

- 如果你需要创建一个数据，需要频繁添加/删除的话，应该优先使用Map而不是Object，因为delete操作符性能差

- Map会保存key的顺序，如果迭代或者item的顺序比较重要的话，应该考虑Map

- 利用Set的元素唯一性特性去除数组中的重复项

  ```js
  let arr = [1, 2, 1, 3]
  let noDupArr = Array.from(new Set(arr)) // [1, 2, 3]
  ```

- 利用Set实现union、intersection、difference

  ```js
  // union
  let a = new Set([1,2,3]);
  let b = new Set([4,3,2]);
  let union = new Set([...a, ...b]);
  
  // intersection
  let a = new Set([1,2,3]);
  let b = new Set([4,3,2]);
  let intersection = new Set(
      [...a].filter(x => b.has(x)));
      // {2,3}
  
  // difference
  let a = new Set([1,2,3]);
  let b = new Set([4,3,2]);
  let difference = new Set(
      [...a].filter(x => !b.has(x)));
      // {1}
  ```

