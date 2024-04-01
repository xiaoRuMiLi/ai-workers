
/// enum /
/**
 * 数字枚举可以反向映射，可以Enum[value] 取值， 字符串枚举则不行
 * 
 */
enum TestEnum {
  'Dom',
  'Cat',
  'Egg'
}

TestEnum[0] // ok
TestEnum["Dom"]//ok
enum TestEnum1 {
  "a" = "DoM",
  "b" = "Cat",
  "c" = "Egg"
}
object.values(TestEnum1);
// 输出[a, b, c, Dom, Cat, Egg]
TestEnum1["a"] // ok
TestEnum1["Dom"] // undefined

/************type 和interface 区别 */
/*使用类型别名type的场景：
定义基本类型的别名时，使用 type
定义元组类型时，使用 type
定义函数类型时，使用 type
定义联合类型时，使用 type
定义映射类型时，使用 type
*/

/**
 * 使用接口interface的场景：
需要利用接口自动合并特性的时候，使用 interface
定义对象类型且无需使用 type 的时候，使用 interface
 */
//类型别名通过 &（交叉运算符）来扩展，而接口通过 extends 的方式来扩展。

//类型别名扩展&

type AnimalA = {
  name: string
}

type BearA = Animal & { 
  honey: boolean 
}

const bear: BearA = getBear() 
bear.name
bear.honey

//接口扩展extends

interface AnimalB {
  name: string
}

interface BearB extends Animal {
  honey: boolean
}
//此外，接口也可以通过 extends 来扩展类型别名定义的类型：

type AnimalC = {
  name: string
}

interface BearC extends AnimalC {
  honey: boolean
}
//同样，类型别名也可以通过 &（交叉运算符）来扩展已定义的接口类型：

interface Animal {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}


//同名接口合并

interface UserC {
  name: string;
}

interface UserC {
  id: number;
}

let user: UserC = { id: 666, name: "阿宝哥" };
user.id; // 666
user.name; // "阿宝哥"

//同名类型别名会冲突

type UserD = {
  name: string;
};

// 标识符“User”重复。ts(2300)
type UserD = { //Error
  id: number;
};

/*作者：硅谷干货
链接：https://www.jianshu.com/p/0690e1119143
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
*/
/****************** 泛型************/
// keyof T，索引类型查询操作符。 对于任何类型T，keyof T的结果为T上已知的公共属性名的联合。 例如：
let carProps: keyof Car; // the union of ('manufacturer' | 'model' | 'year')

// 这里K是T键名中的某一个， K[] 键名组成的数组, T[K][] T中K键值组成的数组
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map(n => o[n]);
}
interface Car {
    manufacturer: string;
    model: string;
    year: number;
    // 定义后会报year: number 出错， 这个是所有属性都要遵循的规范
    // 这是个index signature。这意味着，除了接口的已知属性之外，还可以存在boolean、number或string类型的任何其他属性
    [key: string]: string | number | boolean;
}
let taxi: Car = {
    manufacturer: 'Toyota',
    model: 'Camry',
    year: 2014,
    other: true,
};
// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluck(taxi, ['manufacturer', 'model']);
// If we try to pluck model and year, we get an
// array of a union type: (string | number)[]
let modelYear = pluck(taxi, ['model', 'year', 'other'])

console.log(makeAndModel, modelYear);



/***************** [key: string] 字符串索引索引 ********/

// [key: string] 代表键名为string，约定string其实是可以number. Dictionary<number> 代表键名string键值为number的对象
interface Dictionary<T> {
    [key: string]: T;
}
let keys2: Dictionary<number>; // string | number
keys2 = {"125": 125, 0: 25, test: 1255};

/****************<**> 索引类型 **************/

//  如果你有一个带有字符串索引签名的类型，那么keyof T会是string | number。 
//  (并非只有string，因为在JavaScript里，你可以使用字符串object['42'或 数字object[42]索引来访问对象属性)。 
//  并且T[string]为索引签名的类型：
let key3: keyof Dictionary<number>;
key3 = 1258;
key3 = "125";

console.log(keys2);
let value2: Dictionary<number>['foo']; // number

interface Dictionary<T> {
    [key: number]: T;
}
let keys: keyof Dictionary<number>; // number
// 这里键名类型只能是number，调用键名用string就会出错。
let value3: Dictionary<number>['foo']; // Error, Property 'foo' does not exist on type 'Dictionary<number>'.
let value4: Dictionary<number>[42]; // number

// 总结字符串索引（[key: string]: T;）键名键名可以是string|number的联合类型， 数字索引（[key: number]: T;）只能是数字

type type1 = {key: "str"};
interface inte1  {
    key: "str"
}
let val1: type1 = {key: "str"};
let val2: inte1 = val1;
let val3 = {key: "val"};
type type2 = typeof val2;
type type3 = typeof val3;

/****************in 只读属性 **************/
type Readonly2<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial1<T> = {
	// 全部可选属性， [P in keyof T] 循环添加属性，P in [] 循环
    [P in keyof T]?: T[P];
}

/****************readonly 只读属性 **************/
let readonly2: Readonly2< {id: number, name: string, age: number}> = {id: 1, name: "lihai", age: 23};

// Cannot assign to 'name' because it is a read-only property.
readonly2.name="liyong";

let partiall : Partial1< {id: number, name: string, age: number}> = {id: 1, name: "lihai"};

partiall.name = "liyong";


/****************& 交叉属性 **************/
// 这样使用, 再添加一个newMember属性进去,&类似于合并
type PartialWithNewMember<T> = {
  [P in keyof T]?: T[P];
} & { newMember: boolean }

// 不要这样使用
// 这会报错！
type PartialWithNewMember1<T> = {
  [P in keyof T]?: T[P];
  newMember: boolean;
}


/**************** [K in Keys] 映射类型 ***************/

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

// 相当于

type Flags1 = {
    option1: boolean;
    option2: boolean;
}

/************* T extends U ? X : Y 有条件类型 **************/
type testif<X,Y,U,T>= {
    KEY: T extends U ? X : Y
}
// type extends fatherType type是能给fatherType 赋值的。
// 上面的类型意思是，若T能够赋值给U，那么类型是X，否则为Y

/***************分布式有条件类型 *********************/
type BoxedValue<T> = { value: T };
type BoxedArray<T> = { array: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<T[number]> : BoxedValue<T>;
type T20 = Boxed<string>;  // BoxedValue<string>;
type T21 = Boxed<number[]>;  // BoxedArray<number>;
type T22 = Boxed<string | number[]>;  // BoxedValue<string> | BoxedArray<number>;



/**************** VUE props 基于类型申明**********/
// 在 setup 语法的script标签中
// props 声明
const defineProps: any = function(T: any) {}; //模拟定义一个方法
// 运行时声明
const props = defineProps({
  foo: { type: String, required: true },
  bar: Number
})
props.foo // string
props.bar // number | undefined

// 基于类型声明,效果同运行时声明， IDE兼容更好，推荐
 
const props1 = defineProps<{
   foo: string
   bar?: number
}>() 

// 设置默认值写法
interface Props {
    msg?: string
    labels?: string[]
}
const props2 = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
})
// 组合语法糖写法
interface Props {
    name: string
    count?: number
  }
  
// 对 defineProps() 的响应性解构
// 默认值会被编译为等价的运行时选项
const { name, count = 100 } = defineProps<Props>()

// emit 基于类型事件定义
// 基于类型
const emit = defineEmits<{
    (e: 'change', id: number): void
    (e: 'update', value: string): void
}>()

// Ref 标注类型
import type { Ref } from 'vue'
const year: Ref<string | number> = ref('2020')
year.value = 2020 // 成功！

// reactive标注类型
interface Book {
    title: string
    year?: number
}
const book: Book = reactive({ title: 'Vue 3 指引' })

// computed 返回类型
const double = computed<number>(() => {
    // 若返回值不是 number 类型则会报错
})

// 事件处理函数 
// event 默认推导出来any类型， 可以用断言as断言成HTML类型调用其中属性
function handleChange(event: Event) {
    console.log((event.target as HTMLInputElement).value)
  }

// 为 provide / inject 标注类型
import { provide, inject } from 'vue'
import type { InjectionKey } from 'vue'

const key = Symbol() as InjectionKey<string>
// 建议将注入 key 的类型放在一个单独的文件中，这样它就可以被多个组件导入
provide(key, 'foo') // 提供数据，若提供的是非字符串值会导致错误

const foo = inject(key) // 获取数据，foo 的类型：string | undefined
//const foo = inject<string>('foo') // 类型：string | undefined

//组件获取
const el = ref<HTMLInputElement | null>(null)
onMounted(() => {
  el.value?.focus()
})
</script>
<template>
  <input ref="el" />
</template>

// 引用组件， 调用组件方法
import MyModal from './MyModal.vue'
import { addAbortSignal } from 'stream';
const modal = ref<InstanceType<typeof MyModal> | null>(null)

const openModal = () => {
  modal.value?.open()
}