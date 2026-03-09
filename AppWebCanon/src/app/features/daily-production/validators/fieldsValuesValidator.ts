import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const fieldsValuesValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {

  const targetControl = group.get('targetUnits');
  const okControl = group.get('okUnits');
  const defectControl = group.get('defectUnits');

  if (!targetControl || !okControl || !defectControl) return null;

  const target = Number(targetControl.value) || 0;
  const ok = Number(okControl.value) || 0;
  const defect = Number(defectControl.value) || 0;

  const controls = [targetControl, okControl, defectControl];
  const values = [target, ok, defect];

  // limpiamos errores anteriores
    controls.forEach(control => {
      if (control.errors) {
        const { negative, empty, mismatch } = control.errors;
        if (negative || empty || mismatch) {
          const newErrors = { ...control.errors };
          delete newErrors['negative'];
          delete newErrors['empty'];
          delete newErrors['mismatch'];
          control.setErrors(Object.keys(newErrors).length ? newErrors : null);
        }
      }
    });

  // validar negativos
  if (values.some(value => value < 0)) {
    const i = values.findIndex(value => value < 0);
    const control = controls[i];
    const error = { negative: 'El valor no puede ser negativo' };
    control.setErrors({
      ...(control?.errors ?? {}),
      ...error
    });
    return error;
  }

  // todos en cero
  if (target + ok + defect === 0) {
      const error = { empty: 'el campos debe tener un valor mayor a cero' };
      controls.forEach(control => {
        control.setErrors({
          ...(control?.errors ?? {}),
          ...error
        });
      });
    return error;
  }

  // mismatch
  if (target !== ok + defect) {
    const error = { mismatch: 'La meta debe ser igual a la suma de unidades buenas + defectuosas' };
    targetControl.setErrors({
      ...(targetControl.errors ?? {}),
      ...error
    });
    return error;
  }

  return null;
};
