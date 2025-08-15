<?php
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PostController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/', [DashboardController::class, 'getDashboardInfo']);
    Route::get('/stats', [PostController::class, 'getDashboardStats']);
});