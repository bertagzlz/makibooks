import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { libroActions, alertActions } from '_store';

export { AddEdit };

function AddEdit() {
    const { id } = useParams();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const libro = useSelector(x => x.libros?.item);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        titulo: Yup.string()
            .required('Título requerido'),
        autor: Yup.string()
            .required('Autor requerido'),
        isbn: Yup.string()
            .transform(x => x === '' ? undefined : x)
            // password optional in edit mode
            .concat(id ? null : Yup.string().required('ISBN requerido'))
            .min(13, 'ISBN al menos 13 characteres'),
        categoria: Yup.string()
            .required('categoria requerida'),
        descripcion: Yup.string()
            .required('descripción requerido'),
        imagen: Yup.string()
            .required('Imagen requerida')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    useEffect(() => {
        if (id) {
            setTitle('Editar libro');
            // fetch user details into redux state and 
            // populate form fields with reset()
            dispatch(libroActions.getById(id)).unwrap()
                .then(libro => reset(libro));
        } else {
            setTitle('Añadir libro');
        }
    }, []);

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            // create or update user based on id param
            let message;
            if (id) {
                await dispatch(libroActions.update({ id, data })).unwrap();
                message = 'Libro actualizado';
            } else {
                await dispatch(libroActions.create(data)).unwrap();
                message = 'Libro añadido';
            }

            // redirect to user list with success message
            history.navigate('/LibrosLogged');
            dispatch(alertActions.success({ message, showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <>
            <h1>{title}</h1>
            {!(libro?.loading || libro?.error) &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">
                                isbn
                                {id && <em className="ml-1"> (Deje en blanco para mantener el mismo ISBN)</em>}
                            </label>
                            <input name="isbn" type="text" {...register('isbn')} className={`form-control ${errors.isbn ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.isbn?.message}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col">
                            <label className="form-label">Autor</label>
                            <input name="autor" type="text" {...register('autor')} className={`form-control ${errors.autor ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.autor?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Titulo</label>
                            <input name="titulo" type="text" {...register('titulo')} className={`form-control ${errors.titulo ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.titulo?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Categoria</label>
                            <input name="categoria" type="text" {...register('categoria')} className={`form-control ${errors.categoria ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.categoria?.message}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Descripcion</label>
                            <input name="descripcion" type="text"  {...register('descripcion')} className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.faltas?.descripcion}</div>
                        </div>
                        <div className="mb-3 col">
                            <label className="form-label">Imagen</label>
                            <input name="imagen" type="text" {...register('imagen')} className={`form-control ${errors.imagen ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.imagen?.message}</div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary me-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Save
                        </button>
                        <button onClick={() => reset()} type="button" disabled={isSubmitting} className="btn btn-secondary">Reset</button>
                        <Link to="/Libroslogged" className="btn btn-link">Cancelar</Link>
                    </div>
                </form>
            }
            {libro?.loading &&
                <div className="text-center m-5">
                    <span className="spinner-border spinner-border-lg align-center"></span>
                </div>
            }
            {libro?.error &&
                <div class="text-center m-5">
                    <div class="text-danger">Error cargando libro: {libro.error}</div>
                </div>
            }
        </>
    );
}
