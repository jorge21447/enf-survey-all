<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('petty_cash_box_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 8, 2);
            $table->string('invoiceNumber')->nullable();
            $table->string('description')->nullable();
            $table->string('interested')->nullable();
            $table->bigInteger('number')->nullable();
            $table->date('expenseDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('expenses');
    }
};
