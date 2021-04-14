---
title: 安卓开发入门
date: 2020-12-7
tags: 
  - android
---

## 1. 安装 Android Studio

[下载地址](https://developer.android.com/studio?hl=zh-cn)

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glfll9k15lj310k0qo773.jpg" alt="截屏2020-12-07 下午9.10.00" style="zoom:50%;" />

## 2. 创建新项目

[参考教程](https://developer.android.com/training/basics/firstapp/creating-project?hl=zh-cn)

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glfm1asuboj31970u0jv8.jpg" alt="截屏2020-12-07 下午9.25.23" style="zoom:50%;" />

有两个地方需要注意：

1. **Minimum SDK** ：选择应用支持的最低 Android 版本

   版本越低，支持的设备越多。

2. 如果应用需要旧版库支持，需要选择 **Use legacy android.support libraries**



## 3. 运行项目

可选择在真机或模拟器上运行

1. 在真机上运行

连接成功后会显示该设备：

 ![截屏2020-12-07 下午9.51.34](https://tva1.sinaimg.cn/large/0081Kckwly1glfmshv595j30l001ojrg.jpg)

2. 在模拟器上运行

选择一个模拟器设备：

 ![截屏2020-12-07 下午10.51.57](https://tva1.sinaimg.cn/large/0081Kckwgy1glfojche8dj30e201k3yj.jpg)

点击运行，模拟器界面如下所示：

 <img src="https://tva1.sinaimg.cn/large/0081Kckwgy1glfogu7nboj30me14iwul.jpg" alt="截屏2020-12-07 下午10.49.31" style="zoom:40%;" />



## 4. 页面开发

### （1）静态界面

![截屏2020-12-08 下午2.52.16](https://tva1.sinaimg.cn/large/0081Kckwgy1glggbaslclj31bz0u0wmz.jpg)

创建一个空项目，注意如上几个内容：

1. **manifests/AndroidManifest.xml** 中包含了项目和页面的配置
2. **MainActivity** 是项目的入口，此类型文件用于**控制页面逻辑**（相当于JS）
3. **activity_main.xml** 与Main_activity对应，此类型文件用于**展现页面UI**（相当于html和css）
4. **values** 统一定义常量，方便管理



编写界面有两种方法：**Code**（左） or **Design**（右）

![截屏2020-12-08 下午2.51.41](https://tva1.sinaimg.cn/large/0081Kckwgy1glgg9xj8krj31gn0u0guo.jpg)



### （2）添加响应事件

**activity_main.xml** 

```xml
<Button
    android:id="@+id/button"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_weight="1"
    android:text="@string/button_send"
    android:onClick="sendMessage"
 />
```

**MainActivity**

```kotlin
 fun sendMessage(view: View) {
    // Do something in response to button
    val editText = findViewById<EditText>(R.id.editText)
    val message = editText.text.toString()
 }
```

emmm，熟悉的感觉。

### （3）打印日志

那如何看事件是否能生效呢？可以使用在事件里打印日志的方式。

```kotlin
 Log.i("click","send message...");
```

之后，就可以通过 `tag` 在Logcat 里找到打印的日志信息了。

![截屏2020-12-08 下午3.32.28](https://tva1.sinaimg.cn/large/0081Kckwgy1glghgxitjlj31m00gmdi2.jpg)

### （4）断点调试

点击 **Run>Debug 'app'** 可以启动调试，当运行到断点处可以查看变量的值。

 <img src="https://tva1.sinaimg.cn/large/0081Kckwgy1glghnogi8ej30wo0gigoe.jpg" alt="截屏2020-12-08 下午3.39.30" style="zoom:50%;" />



## 5. 页面跳转

### （1）添加一个新的页面

按教程来，在 **Project** 窗口中，右键点击 **app** 文件夹，然后依次选择 **New > Activity > Empty Activity**，输入文件名确认即可。官方教程中设的文件名为“DisplayMessageActivity”。

Android Studio 会自动执行三项操作：

- 创建 `DisplayMessageActivity` 文件。
- 创建与 `DisplayMessageActivity` 文件**对应的布局文件** `activity_display_message.xml`。
- 在 `AndroidManifest.xml` 中添加所需的`<activity>`元素。

```xml
 <activity android:name=".DisplayMessageActivity"></activity>
```



### （2）添加跳转逻辑

**MainActivity**

```kotlin
val intent = Intent(this, DisplayMessageActivity::class.java);  //第二个参数指定了跳转的页面
startActivity(intent);
```

这样，简单的跳转效果就可以实现了。



### （3）*传递消息

**MainActivity**

```kotlin
    const val EXTRA_MESSAGE = "com.example.myfirstapp.MESSAGE" 

    class MainActivity : AppCompatActivity() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            setContentView(R.layout.activity_main)
        }

        /** Called when the user taps the Send button */
        fun sendMessage(view: View) {
            val editText = findViewById<EditText>(R.id.editText)
            val message = editText.text.toString()
            val intent = Intent(this, DisplayMessageActivity::class.java).apply {
                putExtra(EXTRA_MESSAGE, message)
            }
            startActivity(intent)
        }
    }
```

**DisplayMessageActivity**

```kotlin
val message = intent.getStringExtra(EXTRA_MESSAGE) //get message
```



### （4）*添加返回上一级 **parentActivityName**

```xml
 <activity android:name=".DisplayMessageActivity"
            android:parentActivityName=".MainActivity">
            <!-- The meta-data tag is required if you support API level 15 and lower -->
            <meta-data
                android:name="android.support.PARENT_ACTIVITY"
                android:value=".MainActivity" />
 </activity>
```

 <img src="https://tva1.sinaimg.cn/large/0081Kckwly1glk0oi3z2yj30gg05aq30.jpg" alt="截屏2020-12-11 下午4.54.11" style="zoom:50%;" />





## 问题

1. Android中有哪些布局规则？

 [使用 ConstraintLayout 构建自适应界面](https://developer.android.com/training/constraint-layout?hl=zh-cn)

   > “Match constraints”表示宽度将延长以符合水平约束条件和外边距的定义。因此，文本框将拉伸以填充去除按钮和所有外边距后剩余的水平空间。



## 参考

1. [官方文档](https://developer.android.com/training/basics/firstapp/building-ui?hl=zh-cn)

2. [视频教程](https://www.bilibili.com/video/BV1sK411s7Vp?p=3)

