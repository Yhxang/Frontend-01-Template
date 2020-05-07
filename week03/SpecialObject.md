# 我们无法实现出来的对象

### 前言
JavaScript有许多内置对象，有一些对象是比较特殊的，它们和它们的一些特性是我们无法用纯JavaScript代码实现的，有些对象的行为与正常对象有很大区别。其中Array的length属性便有其特殊之处。  

### Array
在JavaScript中的数组几乎就像普通的Object对象，除了行为上的一点小差异，这点差异可以概括为：数组的“length”属性会随 “numeric”属性（可以理解为数组成员）的变化而调整，确保它总是比数组的最大索引大1。同时，当数组的“length”属性发生变化时， “numeric”属性也会相应调整。 

##### 1. 创建对象时，其“length”属性设置为比数组最大索引大1
```javascript
var arr = ['x', 'y', 'z'];
arr.length; // 3

arr = ['foo'];
arr.length; // 1
```
##### 2. 当“numeric”属性发生变化时，“length”也会发生变化以保持比最大索引大1的关系
```javascript
var arr = ['x', 'y'];
arr.length; // 2

arr[2] = 'z';
arr.length; // 3
```
##### 3. 当“length”属性改变时，“numeric”也会调整，使得最大索引比“length”值小1
```javascript
var arr = ['x', 'y', 'z'];
arr.length = 2;

arr; // ['x', 'y']

arr.length = 4;
arr; //['x', 'y'] // “增加”长度不影响numeric属性
arr.join(); // "x,y,," // 但在其他情况下，如`Array.prototype.push`时会有可见的不同

arr.push('z');
arr; // ['x', 'y', undefined, undefined, 'z']
```
另外，通过`Object.getOwnPropertyDescriptor`方法的返回结果可以获知，length属性是Data Property，而不是含有`set/get`的Accessor Property。那么既然length只是一个数值属性，那么它是怎么做到根据Array内成员变化，也随之动态变化的呢，这便是Array的特殊之处，它是在js底层`[Native Code]`中实现的。 
```javascript
Object.getOwnPropertyDescriptor(new Array(), 'length');
// {value: 0, writable: true, enumerable: false, configurable: false}
``` 

### 其他不可实现的对象：
#### 1. Bound Function Exotic Objects
Bound Function Exotic Objects 是 Function.prototype.bind()函数创建的绑定函数（bound function，BF），它包装了原函数对象。调用绑定函数通常会执行包装函数。  
绑定函数具有以下内部属性：
* `[[BoundTargetFunction]]` - 包装的函数对象
* `[[BoundThis]]` - 在调用包装函数是始终作为this值传递的值。
* `[[BoundArguments]]` - 列表，在对包装函数做任何调用都会优先用列表元素填充参数列表。
* `[[Call]]` - 执行与此对象关联的代码。通过函数调用表达式调用。内部方法的参数是一个this值和一个包含通过调用表达式传递给函数的参数的列表。

#### 2. Array Exotic Objects
见上文

#### 3. String Exotic Objects
字符串特异对象，封装了一个字符串值，并实现了下标取String的片段，拥有一个length属性，即字符串里的元素数量，length属性不可写也不可配置。  
特殊内部插槽：
* `[[StringData]]`

#### 4. Argument Exotic Objects
参数对象的array index属性映射到函数的各个参数上  
特殊内部插槽：
* `[[ParameterMap]]`
#### 5. Integer-Indexed Exotic Objects
特殊内部插槽：
* `[[ViewedArrayBuffer]]`
* `[[ArrayLength]]`
* `[[ByteOffset]]`
* `[[TypedArrayName]]`
#### 6. Module Namespace Exotic Objects
特殊内部插槽：
* `[[Module]]`
* `[[Exports]]`
* `[[Prototype]]`
#### 7. Immutable Prototype Exotic Objects
原型不可变特异对象。此处是Object.prototype，它是所有正常对象的默认原型，已经不可能给它设置原型了

#### 7. Proxy Object
内部插槽：
* `[[ProxyHandler]]`
* `[[ProxyTarget]]`



**参考：**
1. [为什么 es5 不能完美继承数组](https://github.com/wengjq/Blog/issues/22)