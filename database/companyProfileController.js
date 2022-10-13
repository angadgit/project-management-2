
/** Controller */
import companyProfile from '../model/companyProfile'

// get : http://localhost:3000/api/companyProfileApi
export async function getcompanyProfiles(req, res) {
  try {
    const companyProfile = await companyProfile.find({})
    if (!companyProfile) return res.status(404).json({ error: "Data not Found" })
    res.status(200).json(companyProfile)
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" })
  }
}

// get : http://localhost:3000/api/companyProfileApi/1
export async function getcompanyProfile(req, res) {
  try {
    const companyProfileId = req.query;
    let id = companyProfileId.formId
    console.log("controal", req.query)
    if (id) {
      const companyProfile = await companyProfile.findById(id);
      res.status(200).json(companyProfile)
    }
    res.status(404).json({ error: "companyProfile not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the companyProfile...!" })
  }
}

// post : http://localhost:3000/api/companyProfileApi
export async function postcompanyProfile(req, res) {
  console.log(req.body)
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "companyProfile Data Not Provided...!" });
    companyProfile.create(formData, function (err, data) {
      return res.status(200).json(data)
    })
  } catch (error) {
    return res.status(404).json({ error })
  }
}

// put : http://localhost:3000/api/companyProfileApi/1
export async function putcompanyProfile(req, res) {
  try {
    const userId = req.query;
    let id = userId.formId
    const formData = req.body;

    if (id && formData) {
      const user = await companyProfile.findByIdAndUpdate(id, formData);
      res.status(200).json(user)
    }
    res.status(404).json({ error: "companyProfile Not Selected...!" })
  } catch (error) {
    res.status(404).json({ error: "Error While Updating the Data...!" })
  }
}

// delete : http://localhost:3000/api/companyProfileApi/1
export async function deletecompanyProfile(req, res) {
  try {
    const userId = req.query;
    let id = userId.formId
    console.log(id)

    if (id) {
      const user = await companyProfile.findByIdAndDelete(id)
      return res.status(200).json(user)
    }

    res.status(404).json({ error: "companyProfile Not Selected...!" })

  } catch (error) {
    res.status(404).json({ error: "Error While Deleting the User...!" })
  }
}