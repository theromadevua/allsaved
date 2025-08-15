<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::first(); 

        Post::factory()->count(10)->create([
            'user_id' => $user->id,
            'title' => 'Sample Post',
            'content' => 'This is a sample post content.',
        ]);
        
    }
}
