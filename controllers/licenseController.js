import License from '../models/License.js';

export async function validateLicense(req, res) {
  const { licenseId } = req.body;
  if (!licenseId) return res.status(400).json({ error: 'licenseId é obrigatório' });

  try {
    const license = await License.findById(licenseId);
    if (!license) return res.status(404).json({ valid: false, message: 'Licença não encontrada' });

    const isActive = license.status === 'active';
    res.status(200).json({ valid: isActive, license });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao validar licença' });
  }
}
