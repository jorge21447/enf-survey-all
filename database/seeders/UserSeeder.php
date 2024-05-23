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
                'name' => 'Tania Pinto Ucharico',
                'email' => 'alelumatagui@gmail.com',
                'ci' => '4963733',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrativo')->first()->id,  // Asigna el rol "Administrativo"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Irma Pinto Morales',
                'email' => 'irmapintomorales@hotmail.com',
                'ci' => '1234',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrativo')->first()->id,  // Asigna el rol "Administrativo"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Kenneth Fabricio Aliaga Ramirez',
                'email' => 'fabricio.aliaga.ramirez@gmail.com',
                'ci' => '13496656',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Administrativo')->first()->id,  // Asigna el rol "Administrativo"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Lucia Alarcon Altamirano',
                'email' => 'lucia@gmail.com',
                'ci' => '123456',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Docente')->first()->id,  // Asigna el rol "Docente"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
            array(
                'name' => 'Ana García Limachi',
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
                'ci' => '8358429',
                'password' => bcrypt('A123456!'),
                'role_id' => $roles->where('name', 'Estudiante')->first()->id,  // Asigna el rol "Estudiante"
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ),
        ];


        DB::table('users')->insert($datos);
    }
}
