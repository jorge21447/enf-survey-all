<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $roles = Role::all();

        $datos = [
            array(
                'name' => 'Admin',
                'email' => 'admin@admin.com',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrador')->first()->id,  // Asigna el rol "Administrador"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(), 'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Ana García',
                'email' => 'ana.garcia@example.com',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Encuestador')->first()->id,  // Asigna el rol "Encuestador"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Pedro López',
                'email' => 'pedro.lopez@example.com',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Participante')->first()->id,  // Asigna el rol "Participante"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Juan Lopez',
                'email' => 'juan.lopez@example.com',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrativo')->first()->id,  // Asigna el rol "Participante"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
        ];


        DB::table('users')->insert($datos);
    }
}
