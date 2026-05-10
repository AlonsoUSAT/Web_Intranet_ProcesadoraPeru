import { Helmet } from 'react-helmet-async';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

// Esquema Zod para validación
const contactSchema = z.object({
  // 1. Contacto & Compañía
  nombres: z.string().min(2, 'Requerido'),
  apellidos: z.string().min(2, 'Requerido'),
  titulo: z.string().optional(),
  empresa: z.string().min(2, 'Requerido'),
  website: z.string().optional(),
  pais: z.string().min(1, 'Seleccione un país'),
  identificacion: z.string().optional(),
  email: z.string().email('Email inválido'),
  prefijo: z.string().min(1, 'Req'),
  telefono: z.string().min(5, 'Requerido'),
  whatsapp: z.string().optional(),
  
  // 2. Naturaleza del Negocio
  tipoEmpresa: z.string().min(1, 'Requerido'),
  importadoAntes: z.enum(['Si', 'No']).optional(),
  
  // 3. Comercio
  productosInteres: z.array(z.string()).min(1, 'Seleccione al menos un producto'),
  presentacion: z.array(z.string()).min(1, 'Seleccione al menos una presentación'),
  
  // 4. Certificaciones y Logística
  volumen: z.string().optional(),
  unidadVolumen: z.string().optional(),
  puerto: z.string().optional(),
  incoterm: z.string().optional(),
  certificaciones: z.array(z.string()).optional(),
  mensaje: z.string().optional(),
  
  // Consentimiento
  politica: z.boolean().refine(val => val === true, 'Debe aceptar la política de privacidad')
});

const InputField = ({ label, register, name, placeholder, error, type = "text", className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label className="text-[#554339] text-xs font-semibold">{label}</label>}
    <input 
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`w-full border ${error ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-[4px] py-2 px-3 text-sm bg-white outline-none focus:border-[#954500] focus:ring-1 focus:ring-[#954500] placeholder:text-[#A1A1AA] transition-all`}
    />
    {error && <span className="text-red-500 text-[10px] leading-tight">{error.message}</span>}
  </div>
);

export default function Contact() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      prefijo: '+1',
      productosInteres: [],
      presentacion: [],
      certificaciones: [],
      unidadVolumen: 'Contenedores'
    }
  });

  const onSubmit = async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Datos B2B enviados:', data);
      toast.success('Solicitud de cotización enviada correctamente. Nuestro equipo B2B te contactará pronto.');
      reset();
    } catch (error) {
      toast.error('Hubo un error al enviar la solicitud.');
    }
  };

  const productosList = ['Frijol de Palo', 'Mango', 'Fresas', 'Arándano', 'Granadilla', 'Palta', 'Piña'];
  const presentacionesList = ['Fresco', 'Congelado (IQF)', 'Pulpa', 'Deshidratado'];
  const certificacionesList = ['Global GAP', 'SMETA', 'HACCP', 'BRCGS', 'Organic', 'SENASA', 'None Specific'];

  return (
    <>
      <Helmet>
        <title>Contacto B2B - Procesadora Perú</title>
      </Helmet>

      {/* Wrapper Principal (Fondo gris clarito) */}
      <div className="w-full bg-[#FAFAFA] min-h-screen pt-24 pb-0 font-body">
        
        {/* Contenedor del Formulario */}
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 pb-24">
          
          <h1 className="text-[#954500] font-heading text-[32px] md:text-[40px] font-extrabold mb-8 tracking-tight">
            Contacto Procesadora Perú SAC
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
            
            {/* 1. Contacto & Compañía */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">1. Contacto & Compañía</h2>
              </div>
              
              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                  <InputField label="Nombres" name="nombres" register={register} error={errors.nombres} placeholder="e.g. Jane" />
                  <InputField label="Apellidos" name="apellidos" register={register} error={errors.apellidos} placeholder="e.g. Doe" />
                  <InputField label="Título profesional" name="titulo" register={register} error={errors.titulo} placeholder="e.g. Procurement Director" />
                  <InputField label="Nombre de empresa" name="empresa" register={register} error={errors.empresa} placeholder="e.g. Global Foods Ltd." />
                  <InputField label="Website" name="website" register={register} error={errors.website} placeholder="https://www.example.com" />
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-xs font-semibold">País</label>
                    <select {...register('pais')} className={`w-full border ${errors.pais ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-[4px] py-2 px-3 text-sm bg-white outline-none focus:border-[#954500]`}>
                      <option value="">Seleccione un país...</option>
                      <option value="US">Estados Unidos</option>
                      <option value="EU">Unión Europea</option>
                      <option value="AS">Asia</option>
                      <option value="OT">Otro</option>
                    </select>
                    {errors.pais && <span className="text-red-500 text-[10px]">{errors.pais.message}</span>}
                  </div>

                  <InputField label="Número de Identificación fiscal / Registro mercantil" name="identificacion" register={register} error={errors.identificacion} placeholder="Número de registro" />
                  <InputField label="Email corporativo" name="email" type="email" register={register} error={errors.email} placeholder="jane.doe@company.com" />
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-xs font-semibold">Teléfono</label>
                    <div className="flex gap-2">
                      <input type="text" {...register('prefijo')} className="w-[70px] border border-[#D4D4D8] rounded-[4px] py-2 px-3 text-sm bg-white outline-none text-center" />
                      <input type="text" {...register('telefono')} placeholder="555-0123" className={`flex-1 border ${errors.telefono ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-[4px] py-2 px-3 text-sm bg-white outline-none focus:border-[#954500]`} />
                    </div>
                    {(errors.prefijo || errors.telefono) && <span className="text-red-500 text-[10px]">Teléfono requerido</span>}
                  </div>

                  <InputField label="WhatsApp / WeChat" name="whatsapp" register={register} error={errors.whatsapp} placeholder="Número o ID" />
                </div>
              </div>
            </section>

            {/* 2. Naturaleza del Negocio */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">2. Naturaleza del Negocio</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-3">Tipo de empresa</label>
                  <div className="flex flex-col gap-2">
                    {['Importador', 'Distribuidor', 'Cadena de supermercados', 'Procesador / Industria', 'Otro'].map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer w-fit">
                        <input type="radio" value={type} {...register('tipoEmpresa')} className="accent-[#954500] w-3.5 h-3.5" />
                        <span className="text-[#554339] text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                  {errors.tipoEmpresa && <span className="text-red-500 text-[10px] mt-1 block">{errors.tipoEmpresa.message}</span>}
                </div>

                <div className="flex-1 bg-[#F4F4F5] rounded-md p-6 border border-[#E4E4E7] h-fit">
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-3">¿Ha importado productos agrícolas de Perú anteriormente?</label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="Si" {...register('importadoAntes')} className="accent-[#954500] w-3.5 h-3.5" />
                      <span className="text-[#554339] text-sm">Sí</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="No" {...register('importadoAntes')} className="accent-[#954500] w-3.5 h-3.5" />
                      <span className="text-[#554339] text-sm">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Comercio */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">3. Comercio</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-6">
                
                <div>
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-3">Productos de Interés</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {productosList.map(prod => (
                      <label key={prod} className="flex items-center gap-3 bg-[#F4F4F5] border border-[#E4E4E7] rounded-[4px] p-3 cursor-pointer hover:border-[#954500] transition-colors">
                        <input type="checkbox" value={prod} {...register('productosInteres')} className="accent-[#954500] w-4 h-4 rounded-sm border-[#D4D4D8]" />
                        <span className="text-[#554339] text-sm font-medium">{prod}</span>
                      </label>
                    ))}
                  </div>
                  {errors.productosInteres && <span className="text-red-500 text-[10px] mt-1 block">{errors.productosInteres.message}</span>}
                </div>

                <div>
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-3">Presentación requerida</label>
                  <div className="flex flex-wrap gap-4">
                    {presentacionesList.map(pres => (
                      <label key={pres} className="flex items-center gap-2 cursor-pointer bg-[#F4F4F5] border border-[#E4E4E7] rounded-[4px] px-4 py-2 hover:border-[#954500] transition-colors">
                        <input type="checkbox" value={pres} {...register('presentacion')} className="accent-[#954500] w-4 h-4 rounded-sm" />
                        <span className="text-[#554339] text-sm font-medium">{pres}</span>
                      </label>
                    ))}
                  </div>
                  {errors.presentacion && <span className="text-red-500 text-[10px] mt-1 block">{errors.presentacion.message}</span>}
                </div>

              </div>
            </section>

            {/* 4. Certificaciones y Logística */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-9l-5-3H14v12h3"></path><path d="M14 17h1"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">4. Certificaciones y Logística</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#E4E4E7] pb-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-xs font-semibold">Volumen estimado</label>
                    <div className="flex gap-2">
                      <input type="text" {...register('volumen')} placeholder="e.g. 5" className="flex-1 border border-[#D4D4D8] rounded-[4px] py-2 px-3 text-sm bg-white outline-none focus:border-[#954500]" />
                      <select {...register('unidadVolumen')} className="w-[140px] border border-[#D4D4D8] rounded-[4px] py-2 px-3 text-sm bg-white outline-none focus:border-[#954500]">
                        <option value="Contenedores">Contenedores</option>
                        <option value="Toneladas">Toneladas</option>
                        <option value="Pallets">Pallets</option>
                      </select>
                    </div>
                  </div>

                  <InputField label="Puerto de destino" name="puerto" register={register} placeholder="Por ejemplo, el puerto de Rotterdam." />
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#554339] text-xs font-semibold">Incoterm preferido</label>
                    <select {...register('incoterm')} className="w-full border border-[#D4D4D8] rounded-[4px] py-2 px-3 text-sm bg-white outline-none focus:border-[#954500]">
                      <option value="">Seleccione un incoterm...</option>
                      <option value="FOB">FOB</option>
                      <option value="CIF">CIF</option>
                      <option value="EXW">EXW</option>
                      <option value="CFR">CFR</option>
                    </select>
                  </div>
                </div>

                <div className="border-b border-[#E4E4E7] pb-6">
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-3">Certificaciones requeridas</label>
                  <div className="flex flex-wrap gap-3">
                    {certificacionesList.map(cert => (
                      <label key={cert} className="flex items-center gap-2 cursor-pointer bg-white border border-[#D4D4D8] rounded-full px-4 py-1.5 hover:border-[#954500] transition-colors">
                        <input type="checkbox" value={cert} {...register('certificaciones')} className="accent-[#954500] w-3.5 h-3.5" />
                        <span className="text-[#554339] text-[13px] font-medium">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[#554339] text-xs font-semibold block mb-1.5">Mensaje adicional o requisitos específicos</label>
                  <textarea 
                    {...register('mensaje')}
                    placeholder="Por favor, proporcione cualquier detalle adicional sobre especificaciones de calidad, requisitos de embalaje o plazos de entrega..."
                    className="w-full border border-[#D4D4D8] rounded-[4px] py-3 px-3 text-sm bg-white outline-none focus:border-[#954500] min-h-[100px] resize-none"
                  ></textarea>
                </div>

              </div>
            </section>

            {/* Aceptación y Envío */}
            <div className="flex flex-col gap-6 mt-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" {...register('politica')} className="accent-[#954500] w-4 h-4 mt-0.5 rounded-sm" />
                <span className="text-[#71717A] text-xs leading-relaxed max-w-[800px]">
                  Reconozco haber leído y aceptado la Política de Privacidad y los Términos de Servicio. Doy mi consentimiento para que Procesadora Perú SAC procese mis datos para responder a esta consulta comercial.
                </span>
              </label>
              {errors.politica && <span className="text-red-500 text-[10px] -mt-4">{errors.politica.message}</span>}

              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#954500] text-white font-bold text-sm px-8 py-3.5 rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#7a3800] transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar solicitud de cotización'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Sección Inferior de Características (Fondo Gris Claro) */}
        <div className="bg-[#F4F4F5] border-t border-[#E4E4E7] py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Feature 1 */}
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FCE5D8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-[#1B1C1C] font-heading text-xl font-bold">Tecnología de Punta</h3>
              <p className="text-[#554339] font-body text-sm leading-relaxed pr-4">
                Infraestructura industrial avanzada para el lavado, selección electrónica y almacenamiento refrigerado de última generación.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FCE5D8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
              </div>
              <h3 className="text-[#1B1C1C] font-heading text-xl font-bold">Compromiso Agrícola</h3>
              <p className="text-[#554339] font-body text-sm leading-relaxed pr-4">
                Alianzas estratégicas con productores locales basadas en el comercio justo y la transferencia tecnológica constante.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FCE5D8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3 className="text-[#1B1C1C] font-heading text-xl font-bold">Logística Integrada</h3>
              <p className="text-[#554339] font-body text-sm leading-relaxed pr-4">
                Control total del flujo de exportación: desde la planta hasta el puerto, garantizando la frescura y puntualidad.
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
