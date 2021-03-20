function printStacks(androidLogClz, exceptionClz, methodName) {
    var stackInfo = androidLogClz.getStackTraceString(exceptionClz.$new());
    console.log(new Date().getTime()+":"+methodName);
    console.log(stackInfo.substring(20));
};

//https://github.com/frida/frida/issues/503 bug补丁
function stringBuilderToStringPatch(stringBuilderObj) {
    var str = '';
    var length = stringBuilderObj.length();
    for (var i = 0; i < length; i++) {
        str += stringBuilderObj.charAt(i);
    }
    return str;
}


Java.perform(function() {
    var androidLogClz = Java.use("android.util.Log");
    var exceptionClz = Java.use("java.lang.Exception");
    var reg = RegExp(/kk=/);
    var java_lang_StringBuilder_clz = Java.use('java.lang.StringBuilder');
    var java_lang_StringBuilder_clz_toString_9ogt = java_lang_StringBuilder_clz.toString.overload();
    var java_lang_StringBuilder_clz_substring = java_lang_StringBuilder_clz.substring.overload('int','int');
    java_lang_StringBuilder_clz_toString_9ogt.implementation = function() {
       var thErr = undefined;
        var toString = "";
        try {
            toString = java_lang_StringBuilder_clz_toString_9ogt.call(this);
            if (toString && toString.match && toString.match(reg)) {
                printStacks(androidLogClz, exceptionClz, "Detecting '没有风的夏天' in stacks:");
            }
        } catch(err) {
            thErr = err;
        } finally {
            if (thErr) {
                toString = stringBuilderToStringPatch(this);
            }
            return toString;
        }
    };

    var java_lang_StringBuffer_clz = Java.use('java.lang.StringBuffer');
    var java_lang_StringBuffer_clz_toString_9ogt = java_lang_StringBuffer_clz.toString.overload();
    java_lang_StringBuffer_clz_toString_9ogt.implementation = function() {
        var thErr = undefined;
        var toString = "";
        try {
            toString = java_lang_StringBuffer_clz_toString_9ogt.call(this);
            if (toString && toString.match && toString.match(reg)) {
                printStacks(androidLogClz, exceptionClz, "Detecting '没有风的夏天' in stacks:");
            }

        } catch(err) {
            thErr = err;
        } finally {
            if (thErr) {
                toString = stringBuilderToStringPatch(this);
            }
            return toString;
        }
    };

    var java_lang_String_clz = Java.use('java.lang.String');

    var java_lang_String_clz_init_a8vt = java_lang_String_clz.$init.overload('[B', 'int', 'int', 'int');
    java_lang_String_clz_init_a8vt.implementation = function(v0, v1, v2, v3) {
        var toString = undefined;
        var thErr = undefined;
        try {
            toString = java_lang_String_clz_init_a8vt.call(this, v0, v1, v2, v3);
            if (toString && toString.match && toString.match(reg)) {
                printStacks(androidLogClz, exceptionClz, "Detecting '没有风的夏天' in stacks:");
            }

        } catch(err) {
            thErr = err;
        } finally {
            if (thErr) {
                console.log("抛异常了:" + thErr);
                throw exceptionClz.$new('' + thErr);
            }
            return toString;
        }
    };

    var java_lang_String_clz_init_1fva = java_lang_String_clz.$init.overload('[B', 'int', 'int', 'java.nio.charset.Charset');
    java_lang_String_clz_init_1fva.implementation = function(v0, v1, v2, v3) {
        var toString = undefined;
        var toString = undefined;
        var thErr = undefined;
        try {
            toString = java_lang_String_clz_init_1fva.call(this, v0, v1, v2, v3);
            if (toString && toString.match && toString.match(reg)) {
                printStacks(androidLogClz, exceptionClz, "Detecting '没有风的夏天' in stacks:");
            }

        } catch(err) {
            thErr = err;
        } finally {
            if (thErr) {
                console.log("抛异常了:" + thErr);
                throw exceptionClz.$new('' + thErr);
            }
            return toString;
        }
        return toString;
    };
});