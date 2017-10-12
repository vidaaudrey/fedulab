// export const emailRegex = /^[a-zA-Z0-9!#$%&'*+\/=?\^_`{|}~\-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?\^_`{|}~\-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-]*[a-zA-Z0-9])?$/; // eslint-disable-line max-len

export const phoneRegex = /^[0-9-()+ ]{7,}$/;

export const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/; // eslint-disable-line max-len

export const nameRegex = /^.{3,150}$/;

export const slugRegex = /^[a-zA-Z0-9-]+$/;

export const hexColorRegex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
