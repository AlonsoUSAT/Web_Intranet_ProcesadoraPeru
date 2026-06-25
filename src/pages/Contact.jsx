import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useLanguage } from '../context/LanguageContext';

const InputField = ({ label, register, name, placeholder, error, type = "text", className = "" }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    {label && <label htmlFor={name} className="text-[#554339] text-xs font-semibold">{label}</label>}
    <input
      id={name}
      type={type}
      placeholder={placeholder}
      aria-invalid={error ? "true" : "false"}
      {...register(name)}
      className={`w-full border ${error ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-[4px] py-3 md:py-2 px-4 md:px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500] focus:ring-1 focus:ring-[#954500] placeholder:text-[#A1A1AA] transition-all`}
    />
    {error && <span className="text-red-500 text-[10px] leading-tight">{error.message}</span>}
  </div>
);

export default function Contact() {
  const { t } = useLanguage();
  // B2B-002: Lee el estado de navegación enviado desde Products.jsx
  const location = useLocation();
  const productoDeRouter = location.state?.productoInteres ?? null;

  // Esquema Zod (Adentro para poder usar las traducciones 't' en los mensajes de error)
  const contactSchema = z.object({
    nombres: z.string().min(2, t.contacto.valReq),
    apellidos: z.string().min(2, t.contacto.valReq),
    titulo: z.string().optional(),
    empresa: z.string().min(2, t.contacto.valReq),
    website: z.string().optional(),
    pais: z.string().min(1, t.contacto.valPais),
    identificacion: z.string().optional(),
    email: z.string().email(t.contacto.valEmail),
    prefijo: z.string().min(1, 'Req'),
    telefono: z.string().min(5, t.contacto.valReq),
    whatsapp: z.string().optional(),
    tipoEmpresa: z.string().min(1, t.contacto.valReq),
    otroTipoEmpresa: z.string().optional(),
    importadoAntes: z.enum(['Si', 'No']).optional(),
    fechaImportacion: z.string().optional(),
    productosInteres: z.array(z.string()).min(1, t.contacto.valProd),
    presentacion: z.array(z.string()).min(1, t.contacto.valPres),
    volumen: z.string().optional(),
    unidadVolumen: z.string().optional(),
    puerto: z.string().optional(),
    incoterm: z.string().optional(),
    certificaciones: z.array(z.string()).optional(),
    mensaje: z.string().optional(),
    politica: z.boolean().refine(val => val === true, t.contacto.valPol)
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,  // B2B-002: necesario para pre-llenar mensaje desde router state
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      prefijo: '+1',
      productosInteres: [],
      presentacion: [],
      certificaciones: [],
      unidadVolumen: 'Contenedores',
      // B2B-002: pre-rellena el mensaje si viene desde el catálogo de productos
      mensaje: productoDeRouter
        ? `Hola, deseo solicitar mayor información y una cotización personalizada para el producto: ${productoDeRouter}.`
        : ''
    }
  });

  // B2B-002: Sincroniza si el usuario navega entre rutas sin desmontar el componente
  useEffect(() => {
    if (productoDeRouter) {
      setValue(
        'mensaje',
        `Hola, deseo solicitar mayor información y una cotización personalizada para el producto: ${productoDeRouter}.`,
        { shouldValidate: false }
      );
    }
  }, [productoDeRouter, setValue]);

  const watchTipoEmpresa = watch('tipoEmpresa');
  const watchImportadoAntes = watch('importadoAntes');

  const sanitizeInput = (text) => {
    if (!text) return '';
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/script/gi, "[removed]")
      .trim();
  };

  const onSubmit = async (data) => {
    try {
      // Aplicar sanitización antes del envío (SEC-003)
      data.mensaje = sanitizeInput(data.mensaje);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Datos B2B enviados:', data);
      toast.success(t.contacto.toastSuccess);
      reset();
    } catch (error) {
      toast.error(t.contacto.toastError);
    }
  };

  // Listas Dinámicas con Valores fijos para BD y Etiquetas traducidas para UI
  const tiposEmpresa = [
    { val: 'Importador', lbl: t.contacto.empImportador },
    { val: 'Distribuidor', lbl: t.contacto.empDistribuidor },
    { val: 'Cadena de supermercados', lbl: t.contacto.empSuper },
    { val: 'Procesador / Industria', lbl: t.contacto.empIndustria }
  ];

  const productosList = [
    { val: 'Frijol de Palo', lbl: t.contacto.prod1 },
    { val: 'Mango', lbl: t.contacto.prod2 },
    { val: 'Fresas', lbl: t.contacto.prod3 },
    { val: 'Arándano', lbl: t.contacto.prod4 },
    { val: 'Granadilla', lbl: t.contacto.prod5 },
    { val: 'Palta', lbl: t.contacto.prod6 },
    { val: 'Piña', lbl: t.contacto.prod7 }
  ];

  const presentacionesList = [
    { val: 'Fresco', lbl: t.contacto.pres1 },
    { val: 'Congelado (IQF)', lbl: t.contacto.pres2 },
    { val: 'Pulpa', lbl: t.contacto.pres3 },
    { val: 'Deshidratado', lbl: t.contacto.pres4 }
  ];

  const certificacionesList = ['Global GAP', 'SMETA', 'HACCP', 'BRCGS', 'Organic', 'SENASA', 'None Specific'];

  return (
    <>
      <Helmet>
        <title>{t.contacto.pageTitle}</title>
        <meta name="description" content="Contacte con Procesadora Perú S.A.C. Solicite información y cotizaciones personalizadas de nuestros productos agroindustriales e IQF de alta calidad para mercados internacionales." />
      </Helmet>

      <div className="w-full bg-[#FAFAFA] min-h-screen pt-[30px] pb-0 font-body">
        <div className="max-w-[1000px] mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <h1 className="text-[#954500] font-heading text-[32px] md:text-[40px] font-extrabold mb-8 tracking-tight leading-tight">
            {t.contacto.title}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 md:gap-10">

            {/* 1. Contacto & Compañía */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">{t.contacto.sec1Title}</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 md:gap-y-5">
                  <InputField label={t.contacto.lblNombres} name="nombres" register={register} error={errors.nombres} placeholder={t.contacto.phNombres} />
                  <InputField label={t.contacto.lblApellidos} name="apellidos" register={register} error={errors.apellidos} placeholder={t.contacto.phApellidos} />
                  <InputField label={t.contacto.lblTituloProf} name="titulo" register={register} error={errors.titulo} placeholder={t.contacto.phTituloProf} />
                  <InputField label={t.contacto.lblEmpresa} name="empresa" register={register} error={errors.empresa} placeholder={t.contacto.phEmpresa} />
                  <InputField label={t.contacto.lblWebsite} name="website" register={register} error={errors.website} placeholder={t.contacto.phWebsite} />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="pais" className="text-[#554339] text-xs font-semibold">{t.contacto.lblPais}</label>
                    <select id="pais" aria-invalid={errors.pais ? "true" : "false"} {...register('pais')} className={`w-full border ${errors.pais ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-[4px] py-3 md:py-2 px-4 md:px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500]`}>
                      <option value="">{t.contacto.phPais}</option>
                      <option value="US">{t.contacto.paisUS}</option>
                      <option value="EU">{t.contacto.paisEU}</option>
                      <option value="AS">{t.contacto.paisAS}</option>
                      <option value="OT">{t.contacto.paisOT}</option>
                    </select>
                    {errors.pais && <span className="text-red-500 text-[10px]">{errors.pais.message}</span>}
                  </div>

                  <InputField label={t.contacto.lblId} name="identificacion" register={register} error={errors.identificacion} placeholder={t.contacto.phId} />
                  <InputField label={t.contacto.lblEmail} name="email" type="email" register={register} error={errors.email} placeholder={t.contacto.phEmail} />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="telefono" className="text-[#554339] text-xs font-semibold">{t.contacto.lblTel}</label>
                    <div className="flex gap-2">
                      <input id="prefijo" aria-label="Prefijo internacional" type="tel" {...register('prefijo')} aria-invalid={errors.prefijo ? "true" : "false"} className="w-[80px] md:w-[70px] border border-[#D4D4D8] rounded-[4px] py-3 md:py-2 px-3 text-base md:text-sm bg-white outline-none text-center" />
                      <input id="telefono" type="tel" {...register('telefono')} aria-invalid={errors.telefono ? "true" : "false"} placeholder={t.contacto.phTel} className={`flex-1 border ${errors.telefono ? 'border-red-500' : 'border-[#D4D4D8]'} rounded-[4px] py-3 md:py-2 px-4 md:px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500]`} />
                    </div>
                    {(errors.prefijo || errors.telefono) && <span className="text-red-500 text-[10px]">{t.contacto.valTelReq}</span>}
                  </div>

                  <InputField label={t.contacto.lblWsp} name="whatsapp" register={register} error={errors.whatsapp} placeholder={t.contacto.phWsp} />
                </div>
              </div>
            </section>

            {/* 2. Naturaleza del Negocio */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">{t.contacto.sec2Title}</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <label className="text-[#1B1C1C] text-sm md:text-sm font-bold block mb-4 md:mb-3">{t.contacto.lblTipoEmp}</label>
                  <div className="flex flex-col gap-3 md:gap-2">
                    {tiposEmpresa.map(item => (
                      <label key={item.val} className="flex items-center gap-3 md:gap-2 cursor-pointer w-fit">
                        <input type="radio" value={item.val} {...register('tipoEmpresa')} className="accent-[#954500] w-5 h-5 md:w-4 md:h-4" />
                        <span className="text-[#554339] text-base md:text-sm">{item.lbl}</span>
                      </label>
                    ))}

                    <div className="flex items-center gap-3 md:gap-2 w-full max-w-[320px]">
                      <label className="flex items-center gap-3 md:gap-2 cursor-pointer shrink-0">
                        <input type="radio" value="Otro" {...register('tipoEmpresa')} className="accent-[#954500] w-5 h-5 md:w-4 md:h-4" />
                        <span className="text-[#554339] text-base md:text-sm">{t.contacto.empOtro}</span>
                      </label>
                      {watchTipoEmpresa === 'Otro' && (
                        <input
                          id="otroTipoEmpresa"
                          type="text"
                          aria-label="Especifique otro tipo de empresa"
                          {...register('otroTipoEmpresa')}
                          placeholder={t.contacto.phOtroEmp}
                          autoFocus
                          className="flex-1 border border-[#D4D4D8] rounded-[4px] py-1.5 px-3 text-sm bg-white outline-none focus:border-[#954500]"
                        />
                      )}
                    </div>
                  </div>
                  {errors.tipoEmpresa && <span className="text-red-500 text-[10px] mt-2 block">{errors.tipoEmpresa.message}</span>}
                </div>

                <div className="flex-1 bg-[#F4F4F5] rounded-md p-6 border border-[#E4E4E7] h-fit flex flex-col gap-5">
                  <div>
                    <label className="text-[#1B1C1C] text-sm font-bold block mb-4 md:mb-3">{t.contacto.lblImportado}</label>
                    <div className="flex gap-8 md:gap-6">
                      <label className="flex items-center gap-3 md:gap-2 cursor-pointer">
                        <input type="radio" value="Si" {...register('importadoAntes')} className="accent-[#954500] w-5 h-5 md:w-4 md:h-4" />
                        <span className="text-[#554339] text-base md:text-sm">{t.contacto.optSi}</span>
                      </label>
                      <label className="flex items-center gap-3 md:gap-2 cursor-pointer">
                        <input type="radio" value="No" {...register('importadoAntes')} className="accent-[#954500] w-5 h-5 md:w-4 md:h-4" />
                        <span className="text-[#554339] text-base md:text-sm">{t.contacto.optNo}</span>
                      </label>
                    </div>
                  </div>

                  {watchImportadoAntes === 'Si' && (
                    <div className="flex items-center gap-4 pt-1 animate-in fade-in zoom-in duration-200">
                      <label htmlFor="fechaImportacion" className="text-[#1B1C1C] text-sm font-medium">{t.contacto.lblCuando}</label>
                      <input
                        id="fechaImportacion"
                        type="text"
                        {...register('fechaImportacion')}
                        aria-invalid={errors.fechaImportacion ? "true" : "false"}
                        placeholder={t.contacto.phCuando}
                        maxLength={5}
                        className="w-[80px] border border-[#D4D4D8] rounded-[4px] py-1.5 px-3 text-sm bg-white outline-none focus:border-[#954500] text-center"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 3. Comercio */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">{t.contacto.sec3Title}</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-8 md:gap-6">
                <div>
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-4 md:mb-3">{t.contacto.lblProd}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
                    {productosList.map(item => (
                      <label key={item.val} className="flex items-center gap-3 bg-[#F4F4F5] border border-[#E4E4E7] rounded-[4px] p-4 md:p-3 cursor-pointer hover:border-[#954500] transition-colors">
                        <input type="checkbox" value={item.val} {...register('productosInteres')} className="accent-[#954500] w-5 h-5 md:w-4 md:h-4 rounded-sm border-[#D4D4D8]" />
                        <span className="text-[#554339] text-base md:text-sm font-medium">{item.lbl}</span>
                      </label>
                    ))}
                  </div>
                  {errors.productosInteres && <span className="text-red-500 text-[10px] mt-2 block">{errors.productosInteres.message}</span>}
                </div>

                <div>
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-4 md:mb-3">{t.contacto.lblPres}</label>
                  <div className="flex flex-wrap gap-4">
                    {presentacionesList.map(item => (
                      <label key={item.val} className="flex items-center gap-3 md:gap-2 cursor-pointer bg-[#F4F4F5] border border-[#E4E4E7] rounded-[4px] px-5 py-3 md:px-4 md:py-2 hover:border-[#954500] transition-colors">
                        <input type="checkbox" value={item.val} {...register('presentacion')} className="accent-[#954500] w-5 h-5 md:w-4 md:h-4 rounded-sm" />
                        <span className="text-[#554339] text-base md:text-sm font-medium">{item.lbl}</span>
                      </label>
                    ))}
                  </div>
                  {errors.presentacion && <span className="text-red-500 text-[10px] mt-2 block">{errors.presentacion.message}</span>}
                </div>
              </div>
            </section>

            {/* 4. Certificaciones y Logística */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-9l-5-3H14v12h3"></path><path d="M14 17h1"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                <h2 className="text-[#954500] font-heading text-xl font-bold">{t.contacto.sec4Title}</h2>
              </div>

              <div className="bg-white border border-[#E4E4E7] rounded-lg p-6 md:p-8 shadow-sm flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 border-b border-[#E4E4E7] pb-6 md:pb-6">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="volumen" className="text-[#554339] text-xs font-semibold">{t.contacto.lblVol}</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input id="volumen" type="text" {...register('volumen')} aria-invalid={errors.volumen ? "true" : "false"} placeholder={t.contacto.phVol} className="w-full sm:flex-1 border border-[#D4D4D8] rounded-[4px] py-3 md:py-2 px-4 md:px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500]" />
                      <select id="unidadVolumen" aria-label="Unidad de volumen" {...register('unidadVolumen')} className="w-full sm:w-[150px] border border-[#D4D4D8] rounded-[4px] py-3 md:py-2 px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500]">
                        <option value="Contenedores">{t.contacto.vol1}</option>
                        <option value="Toneladas">{t.contacto.vol2}</option>
                        <option value="Pallets">{t.contacto.vol3}</option>
                      </select>
                    </div>
                  </div>

                  <InputField label={t.contacto.lblPuerto} name="puerto" register={register} placeholder={t.contacto.phPuerto} />

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="incoterm" className="text-[#554339] text-xs font-semibold">{t.contacto.lblIncoterm}</label>
                    <select id="incoterm" aria-invalid={errors.incoterm ? "true" : "false"} {...register('incoterm')} className="w-full border border-[#D4D4D8] rounded-[4px] py-3 md:py-2 px-4 md:px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500]">
                      <option value="">{t.contacto.phIncoterm}</option>
                      <option value="FOB">FOB</option>
                      <option value="CIF">CIF</option>
                      <option value="EXW">EXW</option>
                      <option value="CFR">CFR</option>
                    </select>
                  </div>
                </div>

                <div className="border-b border-[#E4E4E7] pb-8 md:pb-6">
                  <label className="text-[#1B1C1C] text-sm font-bold block mb-4 md:mb-3">{t.contacto.lblCert}</label>
                  <div className="flex flex-wrap gap-3">
                    {certificacionesList.map(cert => (
                      <label key={cert} className="flex items-center gap-2 cursor-pointer bg-white border border-[#D4D4D8] rounded-full px-5 py-2.5 md:px-4 md:py-1.5 hover:border-[#954500] transition-colors">
                        <input type="checkbox" value={cert} {...register('certificaciones')} className="accent-[#954500] w-5 h-5 md:w-3.5 md:h-3.5" />
                        <span className="text-[#554339] text-sm md:text-[13px] font-medium">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* B2B-002: Banner contextual — visible solo cuando viene desde el catálogo */}
                {productoDeRouter && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="flex items-start gap-3 bg-[#FFF8F5] border border-[#E07A5F]/40 rounded-md px-4 py-3 mb-1"
                  >
                    <svg className="shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <p className="text-[#554339] font-body text-xs leading-relaxed">
                      <span className="font-bold text-[#954500]">Producto preseleccionado:</span>{' '}
                      {productoDeRouter} — El campo de mensaje ha sido pre-llenado.
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="mensaje" className="text-[#554339] text-xs font-semibold block mb-2 md:mb-1.5">{t.contacto.lblMensaje}</label>
                  <textarea
                    id="mensaje"
                    {...register('mensaje')}
                    aria-invalid={errors.mensaje ? "true" : "false"}
                    placeholder={t.contacto.phMensaje}
                    className="w-full border border-[#D4D4D8] rounded-[4px] py-3 px-4 md:px-3 text-base md:text-sm bg-white outline-none focus:border-[#954500] min-h-[120px] md:min-h-[100px] resize-none"
                  ></textarea>
                </div>
              </div>
            </section>

            {/* Aceptación y Envío */}
            <div className="flex flex-col gap-8 md:gap-6 mt-2 md:mt-4">
              <label htmlFor="politica" className="flex items-start gap-4 md:gap-3 cursor-pointer">
                <input id="politica" type="checkbox" aria-invalid={errors.politica ? "true" : "false"} {...register('politica')} className="accent-[#954500] w-6 h-6 md:w-4 md:h-4 mt-0.5 rounded-sm shrink-0" />
                <span className="text-[#71717A] text-sm md:text-xs leading-relaxed max-w-[800px]">
                  {t.contacto.lblPolitica}
                </span>
              </label>
              {errors.politica && <span className="text-red-500 text-[10px] -mt-6 md:-mt-4">{errors.politica.message}</span>}

              <div className="flex justify-end w-full md:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#954500] text-white font-bold text-base md:text-sm px-8 py-4 md:py-3.5 rounded-[4px] flex items-center justify-center gap-2 hover:bg-[#7a3800] transition-colors shadow-sm disabled:opacity-70"
                >
                  {isSubmitting ? t.contacto.btnEnviando : t.contacto.btnEnviar}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>
              </div>
            </div>

          </form>
        </div>

        {/* Sección Inferior de Características */}
        <div className="bg-[#F4F4F5] border-t border-[#E4E4E7] py-16 md:py-20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12">
            <div className="flex flex-col items-start gap-4">
              <div className="w-14 h-14 md:w-12 md:h-12 rounded-full bg-[#FCE5D8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              </div>
              <h3 className="text-[#1B1C1C] font-heading text-xl md:text-xl font-bold">{t.contacto.feat1Title}</h3>
              <p className="text-[#554339] font-body text-base md:text-sm leading-relaxed pr-0 md:pr-4">{t.contacto.feat1Desc}</p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="w-14 h-14 md:w-12 md:h-12 rounded-full bg-[#FCE5D8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>
              </div>
              <h3 className="text-[#1B1C1C] font-heading text-xl md:text-xl font-bold">{t.contacto.feat2Title}</h3>
              <p className="text-[#554339] font-body text-base md:text-sm leading-relaxed pr-0 md:pr-4">{t.contacto.feat2Desc}</p>
            </div>

            <div className="flex flex-col items-start gap-4">
              <div className="w-14 h-14 md:w-12 md:h-12 rounded-full bg-[#FCE5D8] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#954500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>
              </div>
              <h3 className="text-[#1B1C1C] font-heading text-xl md:text-xl font-bold">{t.contacto.feat3Title}</h3>
              <p className="text-[#554339] font-body text-base md:text-sm leading-relaxed pr-0 md:pr-4">{t.contacto.feat3Desc}</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}