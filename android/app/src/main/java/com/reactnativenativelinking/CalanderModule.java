package com.reactnativenativelinking;

import android.content.Intent;
import android.provider.CalendarContract;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;


// all native modules should extend this class,
// you can also extend BaseJavaModule but this one gives you much more capabilities
class CalendarModule extends ReactContextBaseJavaModule {

    private ReactApplicationContext context;

    CalendarModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("DEFAULT_EVENT_NAME", "New Event");
        return constants;
    }

    // a method that you want to be accessed by the native module
    @ReactMethod
    public void createCalendarEvent(String name, String location, Callback callback) {

        Intent intent = new Intent(Intent.ACTION_INSERT)
                .setData(CalendarContract.Events.CONTENT_URI)
                .putExtra(CalendarContract.Events.TITLE, name)
                .putExtra(CalendarContract.Events.EVENT_LOCATION, location);

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        if (intent.resolveActivity(context.getPackageManager()) != null) {
            context.startActivity(intent);
        }

        callback.invoke("test");

        Log.d("CalendarModule", "Create event called with name: " + name
                + " and location: " + location);
    }

    @ReactMethod
    public void createCalenderEventPromise(String name, String location, Promise promise) {

        Intent intent = new Intent(Intent.ACTION_INSERT)
                .setData(CalendarContract.Events.CONTENT_URI)
                .putExtra(CalendarContract.Events.TITLE, name)
                .putExtra(CalendarContract.Events.EVENT_LOCATION, location);

        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

        // this event should be captured from react native
        WritableMap params = Arguments.createMap();
        params.putString("testCalenderEvent", "something");
        context
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("CalenderEvent", params);


        promise.resolve("return value");

        if (intent.resolveActivity(context.getPackageManager()) != null) {
            context.startActivity(intent);
        }
    }

    // all ReactContextBaseJavaModule libraries should implement this method
    // to return the name of the module to be accessed then by react native
    @NonNull
    @Override
    public String getName() {
        return "CalendarModule";
    }
}