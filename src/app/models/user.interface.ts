export interface User{
    id?: number|string;
    name: string;
    email: string;
    password: string;
    rol: string;
    email_verified_at?: string;
    remember_token?: string;
    apellido?: string;
    cedula?: string;
    no_licencia?: string;
    foto_perfil?: string;
    foto_licencia?: string;
    estado?: string;
    fecha_nac?: string;
    fecha_venc?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Credentials{
    email: string,
    password: string;
}