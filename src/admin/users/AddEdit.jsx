import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const user = useSelector(x => x.users?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Nombre requerido'),
        apellidos: Yup.string()
            .required('Apellidos requerido'),
        email: Yup.string()
            .required('Email requerido'),
        password: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(id ? null : Yup.string().required('Password requerido'))
            .min(6, 'Password al menos 6 characteres'),
        biblioteca: Yup.string()
            .required('biblioteca'),
        faltas: Yup.string()
            .required('Faltas requerido'),
        telefono: Yup.string()
            .required('Teléfono requerido')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Editar usuario');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(userActions.getById(id)).unwrap()
                .then(user => reset(user));
        } else {
            setTitle('Añadir usuario');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(userActions.update({ id, data })).unwrap();
                message = 'Usuario actualizado';
            } else {
                await dispatch(userActions.create(data)).unwrap();
                message = 'Usario añadido';
            }

            // redirect to user list with success message
            history.navigate('/users');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {!(user?.loading || user?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Nombre</label>
                            <input name="name" type="text" {...register('name')} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.name?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Apellidos</label>
                            <input name="apellidos" type="text" {...register('apellidos')} className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.apellidos?.message}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">
                                Password
                                {id && <em className="ml-1"> (Deje en blanco para mantener el mismo password)</em>}
                            </label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Biblioteca</label>
                            <input name="biblioteca" type="number" min={0} max={1} {...register('biblioteca')} className={`form-control ${errors.biblioteca ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.biblioteca?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Faltas</label>
                            <input name="faltas" type="number" min={0} max={1000} {...register('faltas')} className={`form-control ${errors.faltas ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.faltas?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Teléfono</label>
                            <input name="telefono" type="text" {...register('telefono')} className={`form-control ${errors.telefono ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.telefono?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/users" className="btn btn-link">Cancelar</Link>
                    </div>
                </form>
            }
            {user?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {user?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error cargando usuario: {user.error}</div>
                </div>
            }
        </>
    );
}
