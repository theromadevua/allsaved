<?php
use Illuminate\Support\Facades\Route;

Route::middleware('api')->prefix('')->group(base_path('routes/api/auth.php'));
Route::middleware('api')->prefix('posts')->group(base_path('routes/api/posts.php'));
Route::middleware('api')->prefix('dashboard')->group(base_path('routes/api/dashboard.php'));