package com.procesadoraperu.model.nisira;

/**
 * Wrapper genérico que mapea el formato estándar de respuesta de la API PPSAC:
 *
 * {
 *   "success": true,
 *   "message": "...",
 *   "data": { ... } | [ ... ],
 *   "errors": null,
 *   "traceId": "..."
 * }
 */
public class NisiraRespuesta<T> {

    private boolean success;
    private String  message;
    private T       data;
    private Object  errors;
    private String  traceId;

    public boolean isSuccess()  { return success; }
    public String  getMessage() { return message; }
    public T       getData()    { return data; }
    public Object  getErrors()  { return errors; }
    public String  getTraceId() { return traceId; }

    public void setSuccess(boolean success)  { this.success = success; }
    public void setMessage(String message)   { this.message = message; }
    public void setData(T data)              { this.data = data; }
    public void setErrors(Object errors)     { this.errors = errors; }
    public void setTraceId(String traceId)   { this.traceId = traceId; }
}