<?php

namespace App\Console\Commands;

use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class cleanBackup extends Command
{
    protected $signature = 'backup:limpiar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $dias_retencion = 7; // Número de días para retener los backups nuevos

        $archivos = Storage::files('Laravel/');

        foreach ($archivos as $archivo) {
            // Extraer la fecha y hora del nombre del archivo
            preg_match('/(\d{4}-\d{2}-\d{2}-\d{2}-\d{2}-\d{2})/', $archivo, $matches);
            $fecha_creacion = Carbon::createFromFormat('Y-m-d-H-i-s', $matches[1]);
            $dias_pasados = Carbon::now()->diffInDays($fecha_creacion);

            if ($dias_pasados > $dias_retencion) {
                Storage::disk('local')->delete($archivo);
                $this->info("Se ha eliminado el archivo: $archivo");
            }

        }
    }


}
