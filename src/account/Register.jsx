import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { Register };

function Register() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Nombre requerido'),
        apellidos: Yup.string()
            .required('Apellidos requerido'),
        email: Yup.string()
            .required('Email requerido'),
        password: Yup.string()
            .required('Password requerido')
            .min(6, 'Password al menos de 6 characteres')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            // redirect to login page and display success alert
            history.navigate('/account/login');
            dispatch(alertActions.success({ message: 'Registro correcto', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Registro</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.name?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellidos</label>
                        <input name="apellidos" type="text" {...register('apellidos')} className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.apellidos?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Registrar
                    </button>
                    <Link to="../login" className="btn btn-link">Cancelar</Link>
                </form>
            </div>
        </div>
    )
}
