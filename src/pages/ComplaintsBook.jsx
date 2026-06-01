import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

export default function ComplaintsBook() {
  const { t, language } = useLanguage();

  // Definición del esquema de validación (Movido adentro para traducir los errores de Zod)
  const schema = z.object({
    tipoDoc: z.string().min(1, t.libroReclamaciones.valTipoDoc),
    numero: z.string().min(8, t.libroReclamaciones.valNumero),
    nombre: z.string().min(3, t.libroReclamaciones.valNombre),
    telefono: z.string().min(7, t.libroReclamaciones.valTelefono),
    correo: z.string().email(t.libroReclamaciones.valCorreo),
    direccion: z.string().min(5, t.libroReclamaciones.valDireccion),
    tipoBien: z.enum(['Producto', 'Servicio'], { required_error: t.libroReclamaciones.valTipo }),
    descripcionBien: z.string().min(3, t.libroReclamaciones.valDescBien),
    monto: z.string().min(1, t.libroReclamaciones.valMonto),
    tipoReclamacion: z.enum(['Reclamo', 'Queja'], { required_error: t.libroReclamaciones.valTipo }),
    detalle: z.string().min(10, t.libroReclamaciones.valDetalle),
    pedido: z.string().min(10, t.libroReclamaciones.valPedido)
  });

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
      toast.success(t.libroReclamaciones.toastSuccess);
      reset();
    } catch (error) {
      toast.error(t.libroReclamaciones.toastError);
    }
  };

  // La fecha se formatea según el idioma actual
  const today = new Date().toLocaleDateString(language === 'es' ? 'es-PE' : 'en-US', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <>
      <Helmet>
        <title>{t.libroReclamaciones.pageTitle}</title>
        <meta name="description" content={t.libroReclamaciones.metaDesc} />
      </Helmet>

      {/* Main Wrapper */}
      <div className="w-full bg-[#FAFAFA] min-h-screen pt-[30px] pb-16 md:pb-24 font-body flex justify-center">        <div className="w-full max-w-[1000px] px-6 md:px-6">

        {/* Título Principal de la Página */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-[#954500] font-heading text-[32px] md:text-[40px] font-extrabold mb-4 leading-tight">
            {t.libroReclamaciones.titulo}
          </h1>
          <p className="text-[#554339] font-body text-base md:text-[15px] leading-relaxed max-w-[900px]">
            {t.libroReclamaciones.descripcion}
          </p>
        </div>

        {/* Caja Blanca del Formulario */}
        <div className="bg-white rounded-md border border-[#E4E4E7] shadow-sm p-6 md:p-12">

          {/* Header de la caja */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-[#E4E4E7] pb-6 mb-8 md:mb-10">
            <div>
              <span className="text-[#954500] font-body text-[10px] font-bold tracking-widest uppercase block mb-2 md:mb-1">
                {t.libroReclamaciones.hojaReclamacion}
              </span>
              <h2 className="text-[#1B1C1C] font-heading text-2xl md:text-[24px] font-bold">
                {t.libroReclamaciones.formVirtual}
              </h2>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0 bg-[#F4F4F5] md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none w-full md:w-auto">
              <span className="text-[#554339] font-body text-sm md:text-[12px] block">
                {t.libroReclamaciones.fecha}<span className="font-semibold text-[#1B1C1C]">{today}</span>
              </span>
              <span className="text-[#554339] font-body text-sm md:text-[12px] block mt-1">
                {t.libroReclamaciones.nReclamo}<span className="font-semibold text-[#1B1C1C]">{t.libroReclamaciones.autoGenerado}</span>
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
                  {t.libroReclamaciones.secConsumidor}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAFAFA] border border-[#E4E4E7] p-5 md:p-6 rounded-sm">

                {/* Tipo Doc y Número */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2 lg:col-span-1">
                  <div className="col-span-1 flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblTipoDoc}</label>
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
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblNumero}</label>
                    <input
                      type="text"
                      placeholder={t.libroReclamaciones.phNumero}
                      {...register('numero')}
                      className={`w-full border ${errors.numero ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                    />
                    {errors.numero && <span className="text-red-500 text-[10px]">{errors.numero.message}</span>}
                  </div>
                </div>

                {/* Nombre Completo */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblNombre}</label>
                  <input
                    type="text"
                    placeholder={t.libroReclamaciones.phNombre}
                    {...register('nombre')}
                    className={`w-full border ${errors.nombre ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                  />
                  {errors.nombre && <span className="text-red-500 text-[10px]">{errors.nombre.message}</span>}
                </div>

                {/* Teléfono */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblTelefono}</label>
                  <input
                    type="text"
                    placeholder={t.libroReclamaciones.phTelefono}
                    {...register('telefono')}
                    className={`w-full border ${errors.telefono ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                  />
                  {errors.telefono && <span className="text-red-500 text-[10px]">{errors.telefono.message}</span>}
                </div>

                {/* Correo Electrónico */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblCorreo}</label>
                  <input
                    type="email"
                    placeholder={t.libroReclamaciones.phCorreo}
                    {...register('correo')}
                    className={`w-full border ${errors.correo ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#954500]`}
                  />
                  {errors.correo && <span className="text-red-500 text-[10px]">{errors.correo.message}</span>}
                </div>

                {/* Dirección Domiciliaria */}
                <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblDireccion}</label>
                  <input
                    type="text"
                    placeholder={t.libroReclamaciones.phDireccion}
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
                  {t.libroReclamaciones.secBien}
                </h3>
              </div>

              <div className="flex flex-col gap-6 border border-[#E4E4E7] p-5 md:p-6 rounded-sm">

                {/* Radios */}
                <div className="flex gap-8">
                  <label className="flex items-center gap-3 md:gap-2 cursor-pointer">
                    <input type="radio" value="Producto" {...register('tipoBien')} className="accent-[#377000] w-5 h-5 md:w-4 md:h-4" />
                    <span className="text-[#1B1C1C] text-base md:text-[14px] font-medium">{t.libroReclamaciones.radioProducto}</span>
                  </label>
                  <label className="flex items-center gap-3 md:gap-2 cursor-pointer">
                    <input type="radio" value="Servicio" {...register('tipoBien')} className="accent-[#377000] w-5 h-5 md:w-4 md:h-4" />
                    <span className="text-[#1B1C1C] text-base md:text-[14px] font-medium">{t.libroReclamaciones.radioServicio}</span>
                  </label>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="col-span-1 md:col-span-3 flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblDescBien}</label>
                    <input
                      type="text"
                      {...register('descripcionBien')}
                      className={`w-full border ${errors.descripcionBien ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 md:py-2 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#377000]`}
                    />
                    {errors.descripcionBien && <span className="text-red-500 text-[10px]">{errors.descripcionBien.message}</span>}
                  </div>

                  <div className="col-span-1 flex flex-col gap-1.5">
                    <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblMonto}</label>
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
                  {t.libroReclamaciones.secDetalle}
                </h3>
              </div>

              <div className="flex flex-col gap-6 border border-[#E4E4E7] p-5 md:p-6 rounded-sm bg-[#FAFAFA]">

                {/* Radios */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-white p-4 md:p-0 md:bg-transparent rounded-md border border-[#E4E4E7] md:border-none shadow-sm md:shadow-none">
                    <label className="flex items-center gap-3 md:gap-2 cursor-pointer mb-2">
                      <input type="radio" value="Reclamo" {...register('tipoReclamacion')} className="accent-[#DC2626] w-5 h-5 md:w-4 md:h-4" />
                      <span className="text-[#1B1C1C] text-base md:text-[14px] font-bold">{t.libroReclamaciones.radioReclamo}</span>
                    </label>
                    <p className="text-[#71717A] text-[13px] md:text-[12px] pl-8 md:pl-6">
                      {t.libroReclamaciones.descReclamo}
                    </p>
                  </div>

                  <div className="bg-white p-4 md:p-0 md:bg-transparent rounded-md border border-[#E4E4E7] md:border-none shadow-sm md:shadow-none">
                    <label className="flex items-center gap-3 md:gap-2 cursor-pointer mb-2">
                      <input type="radio" value="Queja" {...register('tipoReclamacion')} className="accent-[#DC2626] w-5 h-5 md:w-4 md:h-4" />
                      <span className="text-[#1B1C1C] text-base md:text-[14px] font-bold">{t.libroReclamaciones.radioQueja}</span>
                    </label>
                    <p className="text-[#71717A] text-[13px] md:text-[12px] pl-8 md:pl-6">
                      {t.libroReclamaciones.descQueja}
                    </p>
                  </div>
                </div>

                {/* Textareas */}
                <div className="flex flex-col gap-1.5 mt-2 md:mt-4">
                  <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblDetalle}</label>
                  <textarea
                    placeholder={t.libroReclamaciones.phDetalle}
                    {...register('detalle')}
                    className={`w-full h-[120px] md:h-[100px] border ${errors.detalle ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-sm py-3 px-3 text-base md:text-[14px] bg-white outline-none focus:border-[#DC2626] resize-none`}
                  ></textarea>
                  {errors.detalle && <span className="text-red-500 text-[10px]">{errors.detalle.message}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[#554339] text-sm md:text-[13px] font-semibold">{t.libroReclamaciones.lblPedido}</label>
                  <textarea
                    placeholder={t.libroReclamaciones.phPedido}
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
                {t.libroReclamaciones.termsText1}
                <span className="text-[#954500] hover:underline cursor-pointer font-semibold">{t.libroReclamaciones.termsLink}</span>
                {t.libroReclamaciones.termsText2}
              </p>

              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="w-full md:w-auto border border-[#D4D4D8] text-[#554339] font-bold md:font-semibold text-base md:text-[14px] px-6 py-4 md:py-3 rounded-sm hover:bg-[#F4F4F5] transition-colors"
                >
                  {t.libroReclamaciones.btnLimpiar}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#954500] text-white font-bold md:font-semibold text-base md:text-[14px] px-8 py-4 md:py-3 rounded-sm flex items-center justify-center gap-2 hover:bg-[#7a3800] transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSubmitting ? t.libroReclamaciones.btnEnviando : t.libroReclamaciones.btnEnviar}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
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