import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

// Definición del esquema de validación con Zod
const schema = z.object({
  tipoDoc: z.string().min(1, 'Seleccione tipo de documento'),
  numero: z.string().min(8, 'Número inválido'),
  nombre: z.string().min(3, 'Ingrese su nombre completo'),
  telefono: z.string().min(7, 'Teléfono inválido'),
  correo: z.string().email('Correo electrónico inválido'),
  direccion: z.string().min(5, 'Ingrese su dirección'),
  tipoBien: z.enum(['Producto', 'Servicio'], { required_error: 'Seleccione un tipo' }),
  descripcionBien: z.string().min(3, 'Describa el bien o servicio'),
  monto: z.string().min(1, 'Ingrese el monto'),
  tipoReclamacion: z.enum(['Reclamo', 'Queja'], { required_error: 'Seleccione un tipo' }),
  detalle: z.string().min(10, 'Describa el detalle (min 10 caracteres)'),
  pedido: z.string().min(10, 'Describa su pedido (min 10 caracteres)')
});

export default function ComplaintsBook() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      tipoDoc: 'DNI',
      tipoBien: 'Producto',
      tipoReclamacion: 'Reclamo'
    }
  });

  const onSubmit = async (data) => {
    try {
      // Simular envío de datos
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Formulario enviado:', data);
      toast.success('Reclamación enviada con éxito. Nos pondremos en contacto pronto.');
      reset();
    } catch (error) {
      toast.error('Ocurrió un error al enviar la reclamación. Intente de nuevo.');
    }
  };

  const today = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <>
      <Helmet>
        <title>Libro de Reclamaciones - Procesadora Perú</title>
        <meta name="description" content="Libro de Reclamaciones Virtual de Procesadora Perú SAC." />
      </Helmet>

      {/* Main Wrapper */}
      <div className="w-full bg-[#FAFAFA] min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 font-body flex justify-center">
        
        <div className="w-full max-w-[1000px] px-6 md:px-6">
          
          {/* Título Principal de la Página */}
          <div className="mb-8 md:mb-10">
            <h1 className="text-[#954500] font-heading text-[32px] md:text-[40px] font-extrabold mb-4 leading-tight">
              Libro de Reclamaciones
            </h1>
            <p className="text-[#554339] font-body text-base md:text-[15px] leading-relaxed max-w-[900px]">
              Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, esta institución cuenta con un Libro de Reclamaciones a su disposición.
            </p>
          </div>

          {/* Caja Blanca del Formulario */}
          <div className="bg-white rounded-md border border-[#E4E4E7] shadow-sm p-6 md:p-12">
            
            {/* Header de la caja */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#E4E4E7] pb-6 mb-8 md:mb-10">
              <div>
                <span className="text-[#954500] font-body text-[10px] font-bold tracking-widest uppercase block mb-2 md:mb-1">
                  HOJA DE RECLAMACIÓN
                </span>
                <h2 className="text-[#1B1C1C] font-heading text-2xl md:text-[24px] font-bold">
                  Formulario Virtual
                </h2>
              </div>
              <div className="text-left md:text-right mt-4 md:mt-0 bg-[#F4F4F5] md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none w-full md:w-auto">
                <span className="text-[#554339] font-body text-sm md:text-[12px] block">
                  Fecha: <span className="font-semibold text-[#1B1C1C]">{today}</span>
                </span>
                <span className="text-[#554339] font-body text-sm md:text-[12px] block mt-1">
                  N° de Reclamo: <span className="font-semibold text-[#1B1C1C]">Auto-generado</span>
                </span>
              </div>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 md:gap-12">
              
              {/* Sección 1 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[4px] md:w-[3px] h-[24px] bg-[#954500] shrink-0"></div>
                  <h3 className="text-[#1B1C1C] font-heading text-xl md:text-[22px] font-bold leading-tight">
                    1. Identificación del Consumidor
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAFA] border border-[#E4E4E7] p-5 md:p-6 rounded-sm">
                  
                  {/* Tipo Doc y Número */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2 lg:col-span-1">
                    <div className="col-span-1 flex flex-col gap-1.5">
                      <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Tipo Doc.</label>
                      <select 
                        {...register('tipoDoc')} 
                        className={`w-full border ${errors.tipoDoc ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                      >
                        <option value="DNI">DNI</option>
                        <option value="CE">CE</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div className="col-span-1 sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Número</label>
                      <input 
                        type="text" 
                        placeholder="Ej. 12345678" 
                        {...register('numero')}
                        className={`w-full border ${errors.numero ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                      />
                      {errors.numero && <span className="text-red-500 text-[10px]">{errors.numero.message}</span>}
                    </div>
                  </div>
                  
                  {/* Nombre Completo */}
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Nombre Completo / Razón Social</label>
                    <input 
                      type="text" 
                      placeholder="Ingrese sus nombres y apellidos" 
                      {...register('nombre')}
                      className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                    />
                    {errors.nombre && <span className="text-red-500 text-[10px]">{errors.nombre.message}</span>}
                  </div>

                  {/* Teléfono */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Teléfono</label>
                    <input 
                      type="text" 
                      placeholder="Ej. 999 888 777" 
                      {...register('telefono')}
                      className={`w-full border ${errors.telefono ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                    />
                    {errors.telefono && <span className="text-red-500 text-[10px]">{errors.telefono.message}</span>}
                  </div>

                  {/* Correo Electrónico */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Correo Electrónico</label>
                    <input 
                      type="email" 
                      placeholder="correo@ejemplo.com" 
                      {...register('correo')}
                      className={`w-full border ${errors.correo ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                    />
                    {errors.correo && <span className="text-red-500 text-[10px]">{errors.correo.message}</span>}
                  </div>

                  {/* Dirección Domiciliaria */}
                  <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Dirección Domiciliaria</label>
                    <input 
                      type="text" 
                      placeholder="Av. / Calle / Jiron" 
                      {...register('direccion')}
                      className={`w-full border ${errors.direccion ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                    />
                    {errors.direccion && <span className="text-red-500 text-[10px]">{errors.direccion.message}</span>}
                  </div>

                </div>
              </section>


              {/* Sección 2 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[4px] md:w-[3px] h-[24px] bg-[#377000] shrink-0"></div>
                  <h3 className="text-[#1B1C1C] font-heading text-xl md:text-[22px] font-bold leading-tight">
                    2. Identificación del Bien Contratado
                  </h3>
                </div>

                <div className="flex flex-col gap-6 border border-[#E4E4E7] p-5 md:p-6 rounded-sm">
                  
                  {/* Radios */}
                  <div className="flex gap-8">
                    <label className="flex items-center gap-3 md:gap-2 cursor-pointer">
                      <input type="radio" value="Producto" {...register('tipoBien')} className="accent-[#377000] w-5 h-5 md:w-4 md:h-4" />
                      <span className="text-[#1B1C1C] text-base md:text-[14px] font-medium">Producto</span>
                    </label>
                    <label className="flex items-center gap-3 md:gap-2 cursor-pointer">
                      <input type="radio" value="Servicio" {...register('tipoBien')} className="accent-[#377000] w-5 h-5 md:w-4 md:h-4" />
                      <span className="text-[#1B1C1C] text-base md:text-[14px] font-medium">Servicio</span>
                    </label>
                  </div>

                  {/* Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-1 md:col-span-3 flex flex-col gap-1.5">
                      <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Descripción del Bien/Servicio</label>
                      <input 
                        type="text" 
                        {...register('descripcionBien')}
                        className={`w-full border ${errors.descripcionBien ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#377000]`}
                      />
                      {errors.descripcionBien && <span className="text-red-500 text-[10px]">{errors.descripcionBien.message}</span>}
                    </div>

                    <div className="col-span-1 flex flex-col gap-1.5">
                      <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Monto Reclamado (S/)</label>
                      <input 
                        type="text" 
                        placeholder="0.00" 
                        {...register('monto')}
                        className={`w-full border ${errors.monto ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#377000]`}
                      />
                      {errors.monto && <span className="text-red-500 text-[10px]">{errors.monto.message}</span>}
                    </div>
                  </div>

                </div>
              </section>

              {/* Sección 3 */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-[4px] md:w-[3px] h-[24px] bg-[#DC2626] shrink-0"></div>
                  <h3 className="text-[#1B1C1C] font-heading text-xl md:text-[22px] font-bold leading-tight">
                    3. Detalle de la Reclamación
                  </h3>
                </div>

                <div className="flex flex-col gap-6 border border-[#E4E4E7] p-5 md:p-6 rounded-sm bg-[#FAFAFA]">
                  
                  {/* Radios */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="bg-white p-4 md:p-0 md:bg-transparent rounded-md border border-[#E4E4E7] md:border-none shadow-sm md:shadow-none">
                      <label className="flex items-center gap-3 md:gap-2 cursor-pointer mb-2">
                        <input type="radio" value="Reclamo" {...register('tipoReclamacion')} className="accent-[#DC2626] w-5 h-5 md:w-4 md:h-4" />
                        <span className="text-[#1B1C1C] text-base md:text-[14px] font-bold">Reclamo</span>
                      </label>
                      <p className="text-[#71717A] text-[13px] md:text-[12px] pl-8 md:pl-6">
                        Disconformidad relacionada a los productos o servicios.
                      </p>
                    </div>

                    <div className="bg-white p-4 md:p-0 md:bg-transparent rounded-md border border-[#E4E4E7] md:border-none shadow-sm md:shadow-none">
                      <label className="flex items-center gap-3 md:gap-2 cursor-pointer mb-2">
                        <input type="radio" value="Queja" {...register('tipoReclamacion')} className="accent-[#DC2626] w-5 h-5 md:w-4 md:h-4" />
                        <span className="text-[#1B1C1C] text-base md:text-[14px] font-bold">Queja</span>
                      </label>
                      <p className="text-[#71717A] text-[13px] md:text-[12px] pl-8 md:pl-6">
                        Malestar o descontento respecto a la atención al público.
                      </p>
                    </div>
                  </div>

                  {/* Textareas */}
                  <div className="flex flex-col gap-1.5 mt-2 md:mt-4">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Detalle del Reclamo/Queja</label>
                    <textarea 
                      placeholder="Describa los hechos que motivan su reclamo..." 
                      {...register('detalle')}
                      className={`w-full h-[120px] md:h-[100px] border ${errors.detalle ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#DC2626] resize-none`}
                    ></textarea>
                    {errors.detalle && <span className="text-red-500 text-[10px]">{errors.detalle.message}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">Pedido del Consumidor</label>
                    <textarea 
                      placeholder="Especifique qué solicita a la empresa..." 
                      {...register('pedido')}
                      className={`w-full h-[120px] md:h-[100px] border ${errors.pedido ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#DC2626] resize-none`}
                    ></textarea>
                    {errors.pedido && <span className="text-red-500 text-[10px]">{errors.pedido.message}</span>}
                  </div>

                </div>
              </section>

              {/* Footer Formulario */}
              <div className="pt-6 border-t border-[#E4E4E7] flex flex-col-reverse md:flex-row justify-between items-center gap-6">
                
                <p className="text-[#71717A] text-[13px] md:text-[12px] max-w-[400px] text-center md:text-left">
                  Al enviar este formulario, usted acepta nuestra <span className="text-[#954500] hover:underline cursor-pointer font-semibold">Política de Privacidad</span> para el tratamiento de sus datos.
                </p>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                  <button 
                    type="button"
                    onClick={() => reset()}
                    className="w-full md:w-auto border border-[#D4D4D8] text-[#554339] font-bold md:font-semibold text-base md:text-[14px] px-6 py-4 md:py-3 rounded-sm hover:bg-[#F4F4F5] transition-colors"
                  >
                    Limpiar Formulario
                  </button>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-[#954500] text-white font-bold md:font-semibold text-base md:text-[14px] px-8 py-4 md:py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#7a3800] transition-colors shadow-sm disabled:opacity-70"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Reclamación'}
                    <svg width="18" height="18" md:width="14" md:height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" md:strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </button>
                </div>

              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}
