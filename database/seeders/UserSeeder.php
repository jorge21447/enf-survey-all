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
                'ci' => '123',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrador')->first()->id,  // Asigna el rol "Administrador"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(), 'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Kenneth Aliaga',
                'email' => 'fabricio@gmail.com',
                'ci' => '1234',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrativo')->first()->id,  // Asigna el rol "Administrativo"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Lucia',
                'email' => 'lucia@gmail.com',
                'ci' => '12345',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Docente')->first()->id,  // Asigna el rol "Docente"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Ana García',
                'email' => 'ana@gmail.com',
                'ci' => '1234567',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Docente Asistencial')->first()->id,  // Asigna el rol "Docente"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Jorge Ariel Rosa Humiri',
                'email' => 'jorge@gmail.com',
                'ci' => '123456',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Estudiante')->first()->id,  // Asigna el rol "Estudiante"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
        ];


        DB::table('users')->insert($datos);
    }
}
