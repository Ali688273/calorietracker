package com.calorietracker.app

import android.Manifest
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat

class ReminderReceiver : BroadcastReceiver() {

    override fun onReceive(context: Context, intent: Intent) {
        val type = intent.getStringExtra("type") ?: "general"
        val data = when (type) {
            "food" -> "🍽️ وقت ثبت وعده غذایی امروز است."
            "water" -> "💧 وقت نوشیدن یک لیوان آب است."
            "weight" -> "⚖️ اگر امروز وزن‌کشی داری، وزنت را ثبت کن."
            "exercise" -> "🏃 وقت ثبت فعالیت یا ورزش امروز است."
            "mission" -> "🏆 یک مأموریت کالری‌یار منتظر توست."
            else -> "🎯 یک یادآوری از کالری‌یار"
        }

        val channelId = "calorie_yar_reminders"
        val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            manager.createNotificationChannel(
                NotificationChannel(
                    channelId,
                    "یادآوری‌های کالری‌یار",
                    NotificationManager.IMPORTANCE_DEFAULT
                ).apply {
                    description = "یادآوری غذا، آب، وزن، ورزش و مأموریت‌ها"
                }
            )
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU &&
            context.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED
        ) return

        val notification = NotificationCompat.Builder(context, channelId)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle("کالری‌یار")
            .setContentText(data)
            .setAutoCancel(true)
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)
            .build()

        NotificationManagerCompat.from(context).notify(type.hashCode().and(0x7fffffff), notification)
    }
}
